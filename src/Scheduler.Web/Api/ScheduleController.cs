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

            _schedulerContext.Schedules.Remove(scheduleEntity);
            _schedulerContext.SaveChanges();
        }
    }
}
