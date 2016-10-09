﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Data;

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
        public IEnumerable<string> Get()
        {
            OrganizationRepository repository = new OrganizationRepository(_context);


            return _context.Organizations.Select(o => o.Name).ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
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