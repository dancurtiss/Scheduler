using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Data;
using Scheduler.Web.ApiModels;

namespace Scheduler.Web.Api
{
    [Route("api/[controller]")]
    public class ScheduleController : Controller
    {
        SchedulerContext _context = null;

        public ScheduleController(SchedulerContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet("{id}")]
        public IEnumerable<ScheduleModel> Get(int id)
        {
            return _context.Schedules.Where(p => p.Organization.OrganizationId == id).ToList().Select(o => new ScheduleModel(o)).ToList();
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
            if (schedule == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var organization = _context.Organizations.Single(o => o.OrganizationId == id);
            var scheduleEntity = schedule.Export();
            scheduleEntity.Organization = organization;

            _context.Schedules.Add(scheduleEntity);
            _context.SaveChanges();

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

            var scheduleEntity = _context.Schedules.Single(o => o.ScheduleId == id);
            schedule.Export(scheduleEntity);
            _context.SaveChanges();

            return new ObjectResult(schedule);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var scheduleEntity = _context.Schedules.Single(o => o.ScheduleId == id);
            _context.Schedules.Remove(scheduleEntity);
            _context.SaveChanges();
        }
    }
}
