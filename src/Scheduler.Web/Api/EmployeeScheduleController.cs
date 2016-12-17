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

namespace Scheduler.Web.Api
{
    [Route("api/[controller]")]
    [Authorize("Manage Organization Details")]
    public class EmployeeScheduleController : BaseController
    {
        public EmployeeScheduleController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext) : base(appDbContext, schedulerContext)
        {
        }

        // GET: api/values
        [HttpGet("{id}")]
        public EmployeeScheduleModel Get(int id, string date)
        {
            UserCanAccessOrganization(id);

            var scheduleDate = DateTime.ParseExact(date, "MMddyyyy", CultureInfo.InvariantCulture);

            var endScheduleDate = scheduleDate.AddDays(1);

            var employeeShifts = _schedulerContext.EmployeeShifts.Where(es => es.ShiftStartTime > scheduleDate && es.ShiftEndTime < endScheduleDate).ToList();
            var employees = _schedulerContext.Employees.Include(e => e.Positions).ThenInclude(p => p.Position).Where(e => e.Organization.OrganizationId == id && e.IsActive == true).ToList();
            var shifts = _schedulerContext.Shifts.Include(s => s.Schedule).Include(s => s.Position)
                .Where(s => s.Schedule.StartDate < scheduleDate && s.Schedule.EndDate > scheduleDate && s.Day == scheduleDate.DayOfWeek.ToString())
                .Select(s => s)
                .ToList();

            return new EmployeeScheduleModel(scheduleDate, endScheduleDate, employeeShifts, shifts, employees);
        }

        // POST api/values
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

            DateTime startTime = employeeShift.ShiftDate.ToLocalTime() + TimeSpan.Parse(shiftEntity.StartTime);
            DateTime endTime = employeeShift.ShiftDate.ToLocalTime() + TimeSpan.Parse(shiftEntity.EndTime);

            startTime = startTime.ToLocalTime();
            endTime = endTime.ToLocalTime();

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

            return new ObjectResult(employeeShiftEntity.EmployeeShiftId);
        }

        // PUT api/values/5
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

        // DELETE api/values/5
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
