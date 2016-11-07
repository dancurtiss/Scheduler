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
    public class EmployeeConflictController : Controller
    {
        SchedulerContext _context = null;

        public EmployeeConflictController(SchedulerContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet("{id}")]
        public EmployeeDetailModel Get(int id)
        {
            List<EmployeeConflictModel> employeeConflicts = _context.EmployeeConflicts
                .Where(ec => ec.Employee.EmployeeId == id).ToList()
                .Select(ec => new EmployeeConflictModel(ec)).ToList();

            List<EmployeeShiftDisplayModel> employeeShifts = _context.EmployeeShifts
                .Include(es => es.Shift).ThenInclude(s => s.Position)
                .Where(es => es.Employee.EmployeeId == id && es.ShiftStartTime > DateTime.Today).ToList()
                .Select(es => new EmployeeShiftDisplayModel(es)).ToList();

            return new EmployeeDetailModel { Conflicts = employeeConflicts, Shifts = employeeShifts };
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

            var employeeEntity = _context.Employees.Single(e => e.EmployeeId == id);
            var employeeConflictEntity = employeeConflict.Export();

            employeeConflictEntity.Employee = employeeEntity;

            _context.EmployeeConflicts.Add(employeeConflictEntity);
            _context.SaveChanges();

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

            var employeeConflictEntity = _context.EmployeeConflicts
                .Single(o => o.EmployeeConflictId == id);

            employeeConflict.Export(employeeConflictEntity);
            
            _context.SaveChanges();

            return new ObjectResult(employeeConflict);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var employeeConflictEntity = _context.EmployeeConflicts.Single(o => o.EmployeeConflictId == id);
            _context.EmployeeConflicts.Remove(employeeConflictEntity);
            _context.SaveChanges();
        }
    }
}
