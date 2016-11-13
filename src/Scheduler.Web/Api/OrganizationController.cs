using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Data;
using Scheduler.Web.ApiModels;
using Scheduler.Web.Data;

namespace Scheduler.Web.Api
{
    [Route("api/[controller]")]
    [Authorize("Manage Organizations")]
    public class OrganizationController : BaseController
    {
        public OrganizationController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext) : base(appDbContext, schedulerContext)
        {
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<OrganizationModel> Get()
        {
            return _schedulerContext.Organizations.ToList().Select(o => new OrganizationModel(o)).ToList();
        }

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]OrganizationModel organization)
        {
            if (organization == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var organizationEntity = organization.Export();

            _schedulerContext.Organizations.Add(organizationEntity);
            _schedulerContext.SaveChanges();

            return new ObjectResult(organization);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        [Authorize("Manage Organization Details")]
        public IActionResult Put(int id, [FromBody]OrganizationModel organization)
        {
            UserCanAccessOrganization(id);

            if (organization == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var organizationEntity = _schedulerContext.Organizations.Single(o => o.OrganizationId == id);
            organization.Export(organizationEntity);
            _schedulerContext.SaveChanges();

            return new ObjectResult(organization);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var organizationEntity = _schedulerContext.Organizations.Single(o => o.OrganizationId == id);
            _schedulerContext.Organizations.Remove(organizationEntity);
            _schedulerContext.SaveChanges();
        }
    }
}
