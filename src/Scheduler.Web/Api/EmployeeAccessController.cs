using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Data;
using Scheduler.Web.ApiModels;
using Scheduler.Web.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Scheduler.Web.Models;

namespace Scheduler.Web.Api
{
    [Route("api/[controller]")]
    [Authorize("Manage Employees")]
    public class EmployeeAccessController : BaseController
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public EmployeeAccessController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext,
                        RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager) : base(appDbContext, schedulerContext)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            ApplicationUser employeeUser = _appDbContext.Users.SingleOrDefault(u => u.EmployeeId == id);

            if (employeeUser != null)
            {
                UserCanAccessOrganization(employeeUser.OrganizationId.Value);
                return new ObjectResult(employeeUser);
            }

            return new ObjectResult("null");
        }

        // POST api/values
        [HttpPost("{id}")]
        public async Task<IActionResult> Post([FromQuery]int organizationId, [FromBody]CreateEmployeeAccessModel employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            UserCanAccessOrganization(organizationId);

            // do saving and role creation
            var user = await _userManager.FindByNameAsync(employee.PhoneNumber);
            var role = await _roleManager.FindByNameAsync("Employee");

            if (user != null)
            {
                throw new InvalidOperationException("User already exists.");
            }

            user = new ApplicationUser { UserName = employee.PhoneNumber, EmployeeId = employee.EmployeeId, OrganizationId = organizationId,
                Phone = employee.PhoneNumber, PhoneNumber = employee.PhoneNumber, Email = employee.PhoneNumber + "@test.com" };
            IdentityResult identity = await _userManager.CreateAsync(user, employee.Password);

            user = await _userManager.FindByNameAsync(employee.PhoneNumber);
            await _userManager.AddToRoleAsync(user, role.Name);

            return new ObjectResult(employee);
        }


        // PUT api/values/5
        [Authorize("Manage Employee Details")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePassword(string id, [FromBody]UpdatePasswordModel passwordModel)
        {
            if (passwordModel == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var user = await _userManager.FindByNameAsync(id);

            UserCanAccessEmployee(user.EmployeeId.Value);

            await _userManager.ChangePasswordAsync(user, passwordModel.ExistingPassword, passwordModel.Password);

            return new ObjectResult(user);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> SetResetToken(string id, [FromBody]ResetPasswordModel passwordModel)
        //{
        //    //GeneratePasswordResetTokenAsync -- needs to be done first

        //    if (passwordModel == null)
        //    {
        //        return BadRequest();
        //    }

        //    if (!ModelState.IsValid)
        //    {
        //        return new ObjectResult(ModelState);
        //    }

        //    var user = await _userManager.FindByNameAsync(id);

        //    UserCanAccessEmployee(user.EmployeeId.Value);

        //    await _userManager.ResetPasswordAsync(user, passwordModel.Token, passwordModel.Password);

        //    return new ObjectResult(user);
        //}

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async void Delete(string id)
        {
            var employeeUser = await _userManager.FindByNameAsync(id);

            UserCanAccessOrganization(employeeUser.OrganizationId.Value);

            await _userManager.DeleteAsync(employeeUser);
        }
    }
}
