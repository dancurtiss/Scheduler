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
    public class PositionController : Controller
    {
        SchedulerContext _context = null;

        public PositionController(SchedulerContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet("{id}")]
        public IEnumerable<PositionModel> Get(int id)
        {
            return _context.Positions.Where(p => p.Organization.OrganizationId == id).ToList().Select(o => new PositionModel(o)).ToList();
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

            var organization = _context.Organizations.Single(o => o.OrganizationId == id);
            var positionEntity = position.Export();
            positionEntity.Organization = organization;

            _context.Positions.Add(positionEntity);
            _context.SaveChanges();

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

            var positionEntity = _context.Positions.Single(o => o.PositionId == id);
            position.Export(positionEntity);
            _context.SaveChanges();

            return new ObjectResult(position);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var positionEntity = _context.Positions.Single(o => o.PositionId == id);
            _context.Positions.Remove(positionEntity);
            _context.SaveChanges();
        }
    }
}
