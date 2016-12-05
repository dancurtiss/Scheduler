using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Web.Data;
using Scheduler.Web.Api;
using Scheduler.Data;
using Microsoft.AspNetCore.Authorization;

namespace Scheduler.Web.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext) : base(appDbContext, schedulerContext)
        {
        }

        [Authorize]
        public IActionResult Index()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return View();
            }

            if (UserHasPermission(PermissionClaimType.Organization_Manage))
            {
                ViewBag.RouteUrl = "/organizations";
            }
            else if (UserHasPermission(PermissionClaimType.Organization_Details))
            {
                ViewBag.RouteUrl = string.Format("/organization/detail/{0}", LoggedInUser.OrganizationId);
            }
            else if (UserHasPermission(PermissionClaimType.Employee_Details))
            {
                ViewBag.RouteUrl = string.Format("/employee/detail/{0}", LoggedInUser.EmployeeId);
            }
            else
            {
                throw new UnauthorizedAccessException("Cannot access site.");
            }

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
