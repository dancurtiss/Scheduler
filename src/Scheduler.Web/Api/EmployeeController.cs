using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Data;
using Scheduler.Web.ApiModels;
using Scheduler.Web.Data;

namespace Scheduler.Web.Api
{
    [Route("api/[controller]")]
    [Authorize("Manage Employees")]
    public class EmployeeController : BaseController
    {
        public EmployeeController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext) : base(appDbContext, schedulerContext)
        {
        }

        // GET: api/values
        [HttpGet("{id}")]
        public EmployeeListModel Get(int id)
        {
            UserCanAccessOrganization(id);

            List<PositionModel> availablePositions = _schedulerContext.Positions.Include(p => p.Organization)
                .Where(p => p.Organization.OrganizationId == id).ToList()
                .Select(p => new PositionModel(p)).ToList();

            List<EmployeeModel> employees = _schedulerContext.Employees
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
            UserCanAccessOrganization(id);

            if (employee == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var availablePositions = _schedulerContext.Positions.Include(p => p.Organization)
                                        .Where(p => p.Organization.OrganizationId == id).ToList();


            var organization = _schedulerContext.Organizations.Single(o => o.OrganizationId == id);
            var employeeEntity = employee.Export();
            employeeEntity.Organization = organization;

            foreach(Position position in availablePositions)
            {
                if (employee.EmployeePositionIds.Contains(position.PositionId))
                {
                    _schedulerContext.EmployeePositions.Add(new EmployeePosition { Employee = employeeEntity, Position = position });
                }
            }

            _schedulerContext.Employees.Add(employeeEntity);
            _schedulerContext.SaveChanges();

            return new ObjectResult(employee);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]EmployeeModel employee)
        {
            UserCanAccessEmployee(id);

            if (employee == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var employeeEntity = _schedulerContext.Employees
                .Include(e => e.Organization)
                .Include(e => e.Positions).ThenInclude(p => p.Position)
                .Single(o => o.EmployeeId == id);

            var availablePositions = _schedulerContext.Positions.Include(p => p.Organization)
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
                    _schedulerContext.EmployeePositions.Add(new EmployeePosition { Employee = employeeEntity, Position = position });
                }
                else if (!positionSelected && positionAlreadyIncluded)
                {
                    var removePosition = employeeEntity.Positions.Single(ep => ep.Position.PositionId == position.PositionId);
                    _schedulerContext.EmployeePositions.Remove(removePosition);
                }

            }

            _schedulerContext.SaveChanges();

            return new ObjectResult(employee);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            UserCanAccessEmployee(id);

            var employeeEntity = _schedulerContext.Employees.Single(o => o.EmployeeId == id);
            _schedulerContext.Employees.Remove(employeeEntity);
            _schedulerContext.SaveChanges();
        }
    }
}
