using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Data;
using Scheduler.Web.ApiModels;
using Scheduler.Web.Data;

namespace Scheduler.Web.Api
{
    [Route("api/[controller]")]
    [Authorize("Manage Organization Details")]
    public class ScheduleController : BaseController
    {
        public ScheduleController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext) : base(appDbContext, schedulerContext)
        {
        }

        // GET: api/values
        [HttpGet("{id}")]
        public IEnumerable<ScheduleModel> Get(int id)
        {
            UserCanAccessOrganization(id);

            return _schedulerContext.Schedules.Where(p => p.Organization.OrganizationId == id).ToList().Select(o => new ScheduleModel(o)).ToList();
        }

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/values
        [HttpPost("{id}")]
        public IActionResult Post(int id, [FromBody]ScheduleModel schedule)
        {
            UserCanAccessOrganization(id);

            if (schedule == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var organization = _schedulerContext.Organizations.Single(o => o.OrganizationId == id);
            var scheduleEntity = schedule.Export();
            scheduleEntity.Organization = organization;

            _schedulerContext.Schedules.Add(scheduleEntity);
            _schedulerContext.SaveChanges();

            return new ObjectResult(schedule);
        }

        // POST api/values
        [HttpPost("copyschedule/{id}")]
        public IActionResult CopySchedule(int id, [FromBody]ScheduleModel schedule)
        {
            var sourceSchedule = _schedulerContext.Schedules.Include(s => s.Organization).Single(s => s.ScheduleId == id);
            var sourceShifts = _schedulerContext.Shifts.Include(s => s.Schedule).Include(s => s.Position).Where(s=>s.Schedule.ScheduleId == id).ToList();

            UserCanAccessOrganization(sourceSchedule.Organization.OrganizationId);

            var scheduleEntity = new Schedule();
            scheduleEntity.Name = schedule.Name;
            scheduleEntity.IsActive = true;
            scheduleEntity.Organization = sourceSchedule.Organization;
            scheduleEntity.StartDate = schedule.StartDate.Date;
            scheduleEntity.EndDate = schedule.EndDate.Date;

            _schedulerContext.Schedules.Add(scheduleEntity);
            _schedulerContext.SaveChanges();

            foreach(var sourceShift in sourceShifts)
            {
                Shift shiftEntity = new Shift();

                shiftEntity.Schedule = scheduleEntity;
                shiftEntity.Day = sourceShift.Day;
                shiftEntity.Position = sourceShift.Position;
                shiftEntity.StartTime = sourceShift.StartTime;
                shiftEntity.EndTime = sourceShift.EndTime;

                _schedulerContext.Shifts.Add(shiftEntity);
            }

            _schedulerContext.SaveChanges();

            return new ObjectResult(true);
        }


        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ScheduleModel schedule)
        {
            if (schedule == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var scheduleEntity = _schedulerContext.Schedules.Include(s => s.Organization).Single(o => o.ScheduleId == id);

            UserCanAccessOrganization(scheduleEntity.Organization.OrganizationId);

            schedule.Export(scheduleEntity);
            _schedulerContext.SaveChanges();

            return new ObjectResult(schedule);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var scheduleEntity = _schedulerContext.Schedules.Include(s => s.Organization).Single(o => o.ScheduleId == id);

            UserCanAccessOrganization(scheduleEntity.Organization.OrganizationId);

            try
            {
                _schedulerContext.Schedules.Remove(scheduleEntity);
                _schedulerContext.SaveChanges();
            }
            catch(DbUpdateException ex)
            {
                throw new InvalidOperationException("Could not remove schedule.  Remove shifts first.", ex);
            }
        }
    }
}
