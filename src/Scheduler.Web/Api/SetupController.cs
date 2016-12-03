using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Scheduler.Web.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Data;
using Scheduler.Web.Data;

namespace Scheduler.Web.Api
{
    [Produces("application/json")]
    [Route("api/setup")]
    //[Authorize("Manage System Setup")]
    public class SetupController : BaseController
    {

        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;

        public SetupController(
            ApplicationDbContext appDbContext, 
            SchedulerContext schedulerContext,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILoggerFactory loggerFactory) : base(appDbContext, schedulerContext)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = loggerFactory.CreateLogger<SetupController>();
        }

        [HttpGet("secure")]
        public IActionResult Secure()
        {
            return Json("I'm Secure");
        }

        [HttpGet("roles")]
        public async Task<IActionResult> Roles()
        {
            var adminRole = await _roleManager.FindByNameAsync("SuperAdministrator");
            if (adminRole == null)
            {
                adminRole = new IdentityRole("SuperAdministrator");
                await _roleManager.CreateAsync(adminRole);

                await _roleManager.AddClaimAsync(adminRole, new Claim("permissions", "system.manage"));
                await _roleManager.AddClaimAsync(adminRole, new Claim("permissions", "organizations.manage"));
                await _roleManager.AddClaimAsync(adminRole, new Claim("permissions", "organization.details"));
                await _roleManager.AddClaimAsync(adminRole, new Claim("permissions", "employees.manage"));
                await _roleManager.AddClaimAsync(adminRole, new Claim("permissions", "employees.details"));
            }

            var organizationManagerRole = await _roleManager.FindByNameAsync("OrganizationManager");
            if (organizationManagerRole == null)
            {
                organizationManagerRole = new IdentityRole("OrganizationManager");
                await _roleManager.CreateAsync(organizationManagerRole);

                await _roleManager.AddClaimAsync(organizationManagerRole, new Claim("permissions", "organization.details"));
                await _roleManager.AddClaimAsync(organizationManagerRole, new Claim("permissions", "employees.manage"));
                await _roleManager.AddClaimAsync(organizationManagerRole, new Claim("permissions", "employees.details"));
            }

            var employeeRole = await _roleManager.FindByNameAsync("Employee");
            if (employeeRole == null)
            {
                employeeRole = new IdentityRole("Employee");
                await _roleManager.CreateAsync(employeeRole);

                await _roleManager.AddClaimAsync(employeeRole, new Claim("permissions", "employees.details"));
            }

            return Ok();
        }

        [HttpGet("user")]
        public async Task<IActionResult> UserSetup(string userId)
        {
            var user = await _userManager.FindByNameAsync("dancurtiss@gmail.com");
            var role = await _roleManager.FindByNameAsync("SuperAdministrator");

            if (!await _userManager.IsInRoleAsync(user, role.Name))
            {
                await _userManager.AddToRoleAsync(user, role.Name);
            }

            return Ok();
        }

    }
}