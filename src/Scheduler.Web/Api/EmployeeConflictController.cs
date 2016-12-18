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
    [Authorize("Manage Employee Details")]
    public class EmployeeConflictController : BaseController
    {
        public EmployeeConflictController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext) : base(appDbContext, schedulerContext)
        {
        }

        // GET: api/values
        [HttpGet("{id}")]
        public EmployeeDetailModel Get(int id)
        {
            UserCanAccessEmployee(id);

            var employee = _schedulerContext.Employees.Include(e => e.Organization).Single(e => e.EmployeeId == id);

            List<EmployeeConflictModel> employeeConflicts = _schedulerContext.EmployeeConflicts.Include(ec => ec.Employee)
                .Where(ec => ec.Employee.EmployeeId == id).ToList()
                .Select(ec => new EmployeeConflictModel(ec)).ToList();

            List<EmployeeShiftDisplayModel> employeeShifts = _schedulerContext.EmployeeShifts
                .Include(es => es.Shift).ThenInclude(s => s.Position)
                .Where(es => es.Employee.EmployeeId == id && es.ShiftStartTime > DateTime.Today).ToList()
                .Select(es => new EmployeeShiftDisplayModel(es)).ToList();

            return new EmployeeDetailModel { OrganizationId = employee.Organization.OrganizationId, OrganizationMessage = employee.Organization.Message, Conflicts = employeeConflicts, Shifts = employeeShifts };
        }

        // POST api/values
        [HttpPost("{id}")]
        public IActionResult Post(int id, [FromBody]EmployeeConflictModel employeeConflict)
        {
            if (employeeConflict == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            UserCanAccessEmployee(id);

            var employeeEntity = _schedulerContext.Employees.Single(e => e.EmployeeId == id);
            var employeeConflictEntity = employeeConflict.Export();

            employeeConflictEntity.Employee = employeeEntity;

            _schedulerContext.EmployeeConflicts.Add(employeeConflictEntity);
            _schedulerContext.SaveChanges();

            return new ObjectResult(employeeConflict);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]EmployeeConflictModel employeeConflict)
        {
            if (employeeConflict == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var employeeConflictEntity = _schedulerContext.EmployeeConflicts.Include(ec => ec.Employee)
                .Single(o => o.EmployeeConflictId == id);

            UserCanAccessEmployee(employeeConflictEntity.Employee.EmployeeId);

            employeeConflict.Export(employeeConflictEntity);

            _schedulerContext.SaveChanges();

            return new ObjectResult(employeeConflict);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var employeeConflictEntity = _schedulerContext.EmployeeConflicts.Include(ec => ec.Employee)
                .Single(o => o.EmployeeConflictId == id);

            UserCanAccessEmployee(employeeConflictEntity.Employee.EmployeeId);

            _schedulerContext.EmployeeConflicts.Remove(employeeConflictEntity);
            _schedulerContext.SaveChanges();
        }
    }
}
