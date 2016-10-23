using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Data;
using Scheduler.Web.ApiModels;
using Microsoft.EntityFrameworkCore;

namespace Scheduler.Web.Api
{
    [Route("api/[controller]")]
    public class ShiftController : Controller
    {
        SchedulerContext _context = null;

        public ShiftController(SchedulerContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet("{id}")]
        public ScheduleDetailModel Get(int id)
        {
            Schedule schedule = GetSchedule(id);
            List<Shift> shifts = _context.Shifts.Where(s => s.Schedule.ScheduleId == id).ToList();
            List<Position> positions = GetAvailableSchedulePositions(schedule);

            ScheduleDetailModel model = new ScheduleDetailModel(schedule, shifts, positions);

            return model;
        }

        private Schedule GetSchedule(int id)
        {
            return _context.Schedules.Include(s => s.Organization).Single(s => s.ScheduleId == id);
        }

        private List<Position> GetAvailableSchedulePositions(Schedule schedule)
        {
            return _context.Positions.Where(p => p.Organization.OrganizationId == schedule.Organization.OrganizationId).ToList();
        }

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/values
        [HttpPost("{id}")]
        public IActionResult Post(int id, [FromBody]ShiftModel shift)
        {
            if (shift == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            Schedule schedule = GetSchedule(id);
            var positions = GetAvailableSchedulePositions(schedule);
            var shiftEntity = shift.Export(positions);
            shiftEntity.Schedule = schedule;

            _context.Shifts.Add(shiftEntity);
            _context.SaveChanges();

            return new ObjectResult(shift);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ShiftModel shift)
        {
            if (shift == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var shiftEntity = _context.Shifts
                .Include(s => s.Schedule)
                .Include(s => s.Schedule.Organization)
                .Single(o => o.ShiftId == id);

            shift.Export(shiftEntity, GetAvailableSchedulePositions(shiftEntity.Schedule));
            _context.SaveChanges();

            return new ObjectResult(shift);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var shiftEntity = _context.Shifts.Single(o => o.ShiftId == id);
            _context.Shifts.Remove(shiftEntity);
            _context.SaveChanges();
        }
    }
}
