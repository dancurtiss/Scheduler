using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Scheduler.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            // lookup user by username
            // pull org or employee id as necessary


            if (UserHasPermission(PermissionClaimType.Organizations_Manage))
            {
                ViewBag.RouteUrl = "/organizations";
            }
            else
            {
                ViewBag.RouteUrl = "/organization/detail/2003";
            }

            // This is the landing page -- will keep this .net mvc
            return View();
        }

        private bool UserHasPermission(PermissionClaimType permission)
        {
            return User.HasClaim(SchedulerClaims.CustomClaimTypes[CustomClaimType.Permissions], SchedulerClaims.PermissionClaimTypes[permission].PolicyName);
        }

        //public IActionResult About()
        //{
        //    ViewData["Message"] = "Your application description page.";

        //    return View();
        //}

        //public IActionResult Contact()
        //{
        //    ViewData["Message"] = "Your contact page.";

        //    return View();
        //}

        public IActionResult Error()
        {
            return View();
        }
    }
}
