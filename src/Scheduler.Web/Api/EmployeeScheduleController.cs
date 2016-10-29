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

namespace Scheduler.Web.Api
{
    [Route("api/[controller]")]
    public class EmployeeScheduleController : Controller
    {
        SchedulerContext _context = null;

        public EmployeeScheduleController(SchedulerContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet("{id}")]
        public EmployeeScheduleModel Get(int id, string date)
        {
            var scheduleDate = DateTime.ParseExact(date, "MMddyyyy", CultureInfo.InvariantCulture);

            var endScheduleDate = scheduleDate.AddDays(1);

            var employeeShifts = _context.EmployeeShifts.Where(es => es.ShiftStartTime > scheduleDate && es.ShiftEndTime < endScheduleDate).ToList();
            var employees = _context.Employees.Include(e => e.Positions).ThenInclude(p => p.Position).Where(e => e.Organization.OrganizationId == id && e.IsActive == true).ToList();
            var shifts = _context.Shifts.Include(s => s.Schedule)
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

            Employee employeeEntity = _context.Employees.Single(e => e.EmployeeId == employeeShift.EmployeeId);
            Shift shiftEntity = _context.Shifts.Single(s => s.ShiftId == employeeShift.ShiftId);

            DateTime startTime = employeeShift.ShiftDate + TimeSpan.Parse(shiftEntity.StartTime);
            DateTime endTime = employeeShift.ShiftDate + TimeSpan.Parse(shiftEntity.EndTime);

            EmployeeShift employeeShiftEntity = new EmployeeShift
            {
                Employee = employeeEntity,
                Shift = shiftEntity,
                ShiftStartTime = startTime,
                ShiftEndTime = endTime,
                ConfirmationNumber = 1
            };

            _context.EmployeeShifts.Add(employeeShiftEntity);
            _context.SaveChanges();

            return new ObjectResult(employeeShiftEntity);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
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

            var employeeShiftEntity = _context.EmployeeShifts.Single(es => es.EmployeeShiftId == id);

            employeeShiftEntity.Canceled = true;
            employeeShiftEntity.CancelReason = cancelShift.Reason;
            employeeShiftEntity.CancelDate = DateTime.Now;

            _context.SaveChanges();

            return new ObjectResult(employeeShiftEntity);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var employeeShiftEntity = _context.EmployeeShifts.Single(es => es.EmployeeShiftId == id);
            _context.EmployeeShifts.Remove(employeeShiftEntity);
            _context.SaveChanges();
        }
    }
}
