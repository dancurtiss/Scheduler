using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Data;
using Scheduler.Web.ApiModels;
using System.Globalization;
using Scheduler.Web.Data;
using Scheduler.Web.Services;

namespace Scheduler.Web.Api
{
    [Route("api/[controller]")]
    [Authorize("Manage Organization Details")]
    public class EmployeeScheduleController : BaseController
    {
        private ISmsSender _smsSender;
        public EmployeeScheduleController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext, ISmsSender smsSender) : base(appDbContext, schedulerContext)
        {
            _smsSender = smsSender;
        }

        [HttpGet("{id}")]
        public EmployeeScheduleModel Get(int id, string date)
        {
            UserCanAccessOrganization(id);

            var scheduleDate = DateTime.ParseExact(date, "MMddyyyy", CultureInfo.InvariantCulture).ConvertToUTC();

            var endScheduleDate = scheduleDate.AddDays(1).ConvertToUTC();

            var employeeShifts = _schedulerContext.EmployeeShifts
                .Include(es=>es.Shift)
                .Include(es=>es.Employee)
                .Include(es=>es.Employee.Organization)
                .Where(es => es.Employee.Organization.OrganizationId == id && es.ShiftStartTime > scheduleDate && es.ShiftEndTime < endScheduleDate)
                .ToList();

            var employeeConflicts = _schedulerContext.EmployeeConflicts
                .Include(ec => ec.Employee)
                .Include(ec => ec.Employee.Organization)
                .Where(ec => ec.Employee.Organization.OrganizationId == id && ec.ConflictStart > scheduleDate && ec.ConflictEnd < endScheduleDate)
                .ToList();

            var employees = _schedulerContext.Employees
                .Include(e => e.Positions)
                .ThenInclude(p => p.Position)
                .Where(e => e.Organization.OrganizationId == id && e.IsActive == true).ToList();

            var shifts = _schedulerContext.Shifts
                .Include(s => s.Schedule)
                .Include(s => s.Schedule.Organization)
                .Include(s => s.Position)
                .Where(s => s.Schedule.Organization.OrganizationId == id && s.Schedule.StartDate <= scheduleDate && s.Schedule.EndDate > scheduleDate && s.Day == scheduleDate.DayOfWeek.ToString())
                .Select(s => s)
                .ToList();

            return new EmployeeScheduleModel(scheduleDate, endScheduleDate, employeeShifts, employeeConflicts, shifts, employees);
        }
        private DateTime StartOfWeek(DateTime dt, DayOfWeek startOfWeek)
        {
            int diff = dt.DayOfWeek - startOfWeek;
            if (diff < 0)
            {
                diff += 7;
            }
            return dt.AddDays(-1 * diff);
        }


        [HttpPost("copyday/{id}")]
        public IActionResult CopyDay(int id, [FromBody]CopyDayModel copyDay)
        {
            UserCanAccessOrganization(id);

            DayOfWeek fromDay = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), copyDay.FromDay);
            DateTime copyStartDate = StartOfWeek(copyDay.ScheduleDate, fromDay);
            DateTime copyEndDate = copyStartDate.AddDays(1);

            int copyDaysForward = copyDay.ScheduleDate.Subtract(copyStartDate).Days;

            var employeeShifts = _schedulerContext.EmployeeShifts
                .Include(es => es.Employee)
                .Include(es => es.Employee.Organization)
                .Include(es => es.Shift)
                .ThenInclude(es => es.Schedule)
                .Where(es => es.Employee.Organization.OrganizationId == id && es.ShiftStartTime > copyStartDate && es.ShiftEndTime < copyEndDate)
                .ToList();

            var fromSchedule = employeeShifts.First().Shift.Schedule;

            // need to figure out how to translate shifts across
            foreach (var sourceShift in employeeShifts)
            {
                string targetDay = copyDay.ScheduleDate.DayOfWeek.ToString();
                Shift targetShift = _schedulerContext.Shifts
                    .Include(s => s.Schedule)
                    .SingleOrDefault(s =>
                        s.Schedule.ScheduleId == fromSchedule.ScheduleId &&
                        s.Day == targetDay &&
                        s.StartTime == sourceShift.Shift.StartTime &&
                        s.EndTime == sourceShift.Shift.EndTime);

                if (targetShift == null)
                {
                    throw new InvalidOperationException("Could not find matching shifts to copy to.");
                }

                EmployeeShift employeeShiftEntity = new EmployeeShift
                {
                    Employee = sourceShift.Employee,
                    Shift = targetShift,
                    ShiftStartTime = sourceShift.ShiftStartTime.AddDays(copyDaysForward),
                    ShiftEndTime = sourceShift.ShiftEndTime.AddDays(copyDaysForward),
                    ConfirmationNumber = 1
                };

                _schedulerContext.EmployeeShifts.Add(employeeShiftEntity);
            }

            _schedulerContext.SaveChanges();

            return new ObjectResult(true);
        }


        [HttpPost("copyweek/{id}")]
        public IActionResult CopyWeek(int id, [FromBody]CopyWeekModel copyWeek)
        {
            UserCanAccessOrganization(id);

            DateTime copyStartDate = copyWeek.StartDate.Date;
            DateTime copyEndDate = copyStartDate.AddDays(7);

            ValidateScheduleCopy(id, copyStartDate);

            var employeeShifts = _schedulerContext.EmployeeShifts
                .Include(es => es.Employee)
                .Include(es => es.Employee.Organization)
                .Include(es => es.Shift)
                .Where(es => es.Employee.Organization.OrganizationId == id && es.ShiftStartTime > copyStartDate && es.ShiftEndTime < copyEndDate)
                .ToList();

            foreach (var sourceShift in employeeShifts)
            {
                EmployeeShift employeeShiftEntity = new EmployeeShift
                {
                    Employee = sourceShift.Employee,
                    Shift = sourceShift.Shift,
                    ShiftStartTime = sourceShift.ShiftStartTime.AddDays(7),
                    ShiftEndTime = sourceShift.ShiftEndTime.AddDays(7),
                    ConfirmationNumber = 1
                };

                _schedulerContext.EmployeeShifts.Add(employeeShiftEntity);
            }

            _schedulerContext.SaveChanges();

            return new ObjectResult(true);
        }

        private void ValidateScheduleCopy(int id, DateTime copyStartDate)
        {
            DateTime copyEndTargetDate = copyStartDate.AddDays(14);

            int copyFromScheduleId = _schedulerContext.Schedules
                .Include(s => s.Organization)
                .Single(s => s.Organization.OrganizationId == id && s.StartDate <= copyStartDate && s.EndDate >= copyStartDate)
                .ScheduleId;

            Schedule copyToSchedule = _schedulerContext.Schedules
                .Include(s => s.Organization)
                .SingleOrDefault(s => s.Organization.OrganizationId == id && s.StartDate <= copyEndTargetDate && s.EndDate >= copyEndTargetDate);

            int copyToScheduleId = copyToSchedule == null ? 0 : copyToSchedule.ScheduleId;

            if (copyToScheduleId != copyFromScheduleId)
            {
                throw new InvalidOperationException("Cannot copy across schedules.");
            }
        }

        [HttpPost("{id}")]
        public IActionResult Post(int id, [FromBody]AddEmployeeShiftModel employeeShift)
        {
            if (employeeShift == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            UserCanAccessEmployee(employeeShift.EmployeeId);

            Employee employeeEntity = _schedulerContext.Employees.Single(e => e.EmployeeId == employeeShift.EmployeeId);
            Shift shiftEntity = _schedulerContext.Shifts.Single(s => s.ShiftId == employeeShift.ShiftId);

            TimeSpan parsedStartTime = TimeSpan.Parse(shiftEntity.StartTime);
            DateTime startTime = employeeShift.ShiftDate.ToUniversalTime().Date;
            if (parsedStartTime.IsUtcTimeNextLocalDay())
            {
                startTime = startTime.AddDays(1);
            }
            startTime = startTime.Add(parsedStartTime);

            TimeSpan parsedEndTime = TimeSpan.Parse(shiftEntity.EndTime);
            DateTime endTime = employeeShift.ShiftDate.ToUniversalTime().Date;
            if (parsedEndTime.IsUtcTimeNextLocalDay())
            {
                endTime = endTime.AddDays(1);
            }
            endTime = endTime.Add(parsedEndTime);

            EmployeeShift employeeShiftEntity = new EmployeeShift
            {
                Employee = employeeEntity,
                Shift = shiftEntity,
                ShiftStartTime = startTime,
                ShiftEndTime = endTime,
                ConfirmationNumber = 1
            };

            // TODO: NEED TO VALIDATE BASED ON UI RULES

            _schedulerContext.EmployeeShifts.Add(employeeShiftEntity);
            _schedulerContext.SaveChanges();

            //_smsSender.SendSmsAsync("9529131633", $"Shift added {startTime.ToString("MM/dd/yyyy")}");

            return new ObjectResult(employeeShiftEntity.EmployeeShiftId);
        }

        [HttpPut("{id}")]
        [Authorize("Manage Employee Details")]
        public IActionResult Put(int id, [FromBody]CancelEmployeeShiftModel cancelShift)
        {
            if (cancelShift == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var employeeShiftEntity = _schedulerContext.EmployeeShifts.Include(es => es.Employee).Single(es => es.EmployeeShiftId == id);

            UserCanAccessEmployee(employeeShiftEntity.Employee.EmployeeId);

            employeeShiftEntity.Canceled = true;
            employeeShiftEntity.CancelReason = cancelShift.Reason;
            employeeShiftEntity.CancelDate = DateTime.Now;

            _schedulerContext.SaveChanges();

            return new ObjectResult(employeeShiftEntity);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var employeeShiftEntity = _schedulerContext.EmployeeShifts.Include(es => es.Employee).Single(es => es.EmployeeShiftId == id);

            UserCanAccessEmployee(employeeShiftEntity.Employee.EmployeeId);

            _schedulerContext.EmployeeShifts.Remove(employeeShiftEntity);
            _schedulerContext.SaveChanges();
        }
    }
}
