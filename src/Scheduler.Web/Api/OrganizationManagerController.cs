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
    [Authorize("Manage System Setup")]
    public class OrganizationManagerController : BaseController
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public OrganizationManagerController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext,
                        RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager) : base(appDbContext, schedulerContext)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        public List<ApplicationUser> Get(int id)
        {
            UserCanAccessOrganization(id);

            List<ApplicationUser> managers = _appDbContext.Users.Where(u => u.OrganizationId == id && u.EmployeeId == null).ToList();

            return managers;
        }

        // POST api/values
        [HttpPost("{id}")]
        public async Task<IActionResult> Post(int id, [FromBody]CreateOrganizationManagerModel manager)
        {
            if (manager == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            // do saving and role creation
            var user = await _userManager.FindByNameAsync(manager.UserName);
            var role = await _roleManager.FindByNameAsync("OrganizationManager");

            if (user != null)
            {
                throw new InvalidOperationException("User already exists.");
            }

            user = new ApplicationUser { UserName = manager.UserName, OrganizationId = id, Phone = manager.PhoneNumber, PhoneNumber = manager.PhoneNumber, Email = manager.EmailAddress };
            var result = await _userManager.CreateAsync(user, manager.Password);

            if (result.Succeeded)
            {
                user = await _userManager.FindByNameAsync(manager.UserName);
                await _userManager.AddToRoleAsync(user, role.Name);
            }
            else
            {
                AddErrors(result);
                return new ObjectResult(ModelState);
            }

            return new ObjectResult(manager);
        }
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async void Delete(string id)
        {
            var user = await _userManager.FindByNameAsync(id);

            await _userManager.DeleteAsync(user);
        }
    }
}
