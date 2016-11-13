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
    public class PositionController : BaseController
    {
        public PositionController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext) : base(appDbContext, schedulerContext)
        {
        }

        // GET: api/values
        [HttpGet("{id}")]
        public IEnumerable<PositionModel> Get(int id)
        {
            UserCanAccessOrganization(id);

            return _schedulerContext.Positions.Where(p => p.Organization.OrganizationId == id).ToList().Select(o => new PositionModel(o)).ToList();
        }

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/values
        [HttpPost("{id}")]
        public IActionResult Post(int id, [FromBody]PositionModel position)
        {
            if (position == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            UserCanAccessOrganization(id);

            var organization = _schedulerContext.Organizations.Single(o => o.OrganizationId == id);
            var positionEntity = position.Export();
            positionEntity.Organization = organization;

            _schedulerContext.Positions.Add(positionEntity);
            _schedulerContext.SaveChanges();

            return new ObjectResult(position);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]PositionModel position)
        {
            if (position == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var positionEntity = _schedulerContext.Positions.Include(p => p.Organization).Single(o => o.PositionId == id);

            UserCanAccessOrganization(positionEntity.Organization.OrganizationId);

            position.Export(positionEntity);
            _schedulerContext.SaveChanges();

            return new ObjectResult(position);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var positionEntity = _schedulerContext.Positions.Include(p => p.Organization).Single(o => o.PositionId == id);

            UserCanAccessOrganization(positionEntity.Organization.OrganizationId);

            _schedulerContext.Positions.Remove(positionEntity);
            _schedulerContext.SaveChanges();
        }
    }
}
