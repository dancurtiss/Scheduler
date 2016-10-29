using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Data;
using Scheduler.Web.ApiModels;

namespace Scheduler.Web.Api
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        SchedulerContext _context = null;

        public EmployeeController(SchedulerContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet("{id}")]
        public EmployeeListModel Get(int id)
        {
            List<PositionModel> availablePositions = _context.Positions.Include(p => p.Organization)
                .Where(p => p.Organization.OrganizationId == id).ToList()
                .Select(p => new PositionModel(p)).ToList();

            List<EmployeeModel> employees = _context.Employees
                .Include(e => e.Positions).ThenInclude(p => p.Position)
                .Where(p => p.Organization.OrganizationId == id).ToList()
                .Select(o => new EmployeeModel(o)).ToList();

            return new EmployeeListModel { AvailablePositions = availablePositions, Employees = employees };
        }

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/values
        [HttpPost("{id}")]
        public IActionResult Post(int id, [FromBody]EmployeeModel employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var availablePositions = _context.Positions.Include(p => p.Organization)
                                        .Where(p => p.Organization.OrganizationId == id).ToList();


            var organization = _context.Organizations.Single(o => o.OrganizationId == id);
            var employeeEntity = employee.Export();
            employeeEntity.Organization = organization;

            foreach(Position position in availablePositions)
            {
                if (employee.EmployeePositionIds.Contains(position.PositionId))
                {
                    _context.EmployeePositions.Add(new EmployeePosition { Employee = employeeEntity, Position = position });
                }
            }

            _context.Employees.Add(employeeEntity);
            _context.SaveChanges();

            return new ObjectResult(employee);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]EmployeeModel employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var employeeEntity = _context.Employees
                .Include(e => e.Organization)
                .Include(e => e.Positions).ThenInclude(p => p.Position)
                .Single(o => o.EmployeeId == id);

            var availablePositions = _context.Positions.Include(p => p.Organization)
                .Where(p => p.Organization.OrganizationId == employeeEntity.Organization.OrganizationId).ToList();

            var currentPositions = employeeEntity.Positions.Select(p => p.Position.PositionId);

            employee.Export(employeeEntity);

            foreach (Position position in availablePositions)
            {
                // see if the employee has position selected
                bool positionSelected = employee.EmployeePositionIds.Contains(position.PositionId);
                bool positionAlreadyIncluded = currentPositions.Contains(position.PositionId);

                if (positionSelected && positionAlreadyIncluded)
                {
                }
                else if (positionSelected && !positionAlreadyIncluded)
                {
                    _context.EmployeePositions.Add(new EmployeePosition { Employee = employeeEntity, Position = position });
                }
                else if (!positionSelected && positionAlreadyIncluded)
                {
                    var removePosition = employeeEntity.Positions.Single(ep => ep.Position.PositionId == position.PositionId);
                    _context.EmployeePositions.Remove(removePosition);
                }

            }

            _context.SaveChanges();

            return new ObjectResult(employee);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var employeeEntity = _context.Employees.Single(o => o.EmployeeId == id);
            _context.Employees.Remove(employeeEntity);
            _context.SaveChanges();
        }
    }
}
