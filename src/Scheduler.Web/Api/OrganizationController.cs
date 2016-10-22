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
    public class OrganizationController : Controller
    {
        SchedulerContext _context = null;

        public OrganizationController(SchedulerContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<OrganizationModel> Get()
        {
            return _context.Organizations.ToList().Select(o => new OrganizationModel(o)).ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

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

            _context.Organizations.Add(organizationEntity);
            _context.SaveChanges();

            return new ObjectResult(organization);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
