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
using Scheduler.Web.ApiModels;

namespace Scheduler.Web.Api
{
    [Route("api/authorization")]
    public class AuthorizationController : Controller
    {

        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;


        public AuthorizationController(
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILoggerFactory loggerFactory)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = loggerFactory.CreateLogger<SetupController>();
        }

        [HttpGet()]
        public AuthorizationDetailsModel Index()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return new AuthorizationDetailsModel();
            }

            return new AuthorizationDetailsModel(User.Identity.Name, User.Claims.Where(c => c.Type.Equals(SchedulerClaims.CustomClaimTypes[CustomClaimType.Permissions], StringComparison.OrdinalIgnoreCase)).Select(c => c.Value).ToList());
        }
    }
}