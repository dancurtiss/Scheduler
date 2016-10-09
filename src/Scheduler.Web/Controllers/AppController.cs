using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Scheduler.Web.Controllers
{
    [Authorize]
    public class AppController : Controller
    {
        public IActionResult Index()
        {
            // This is the real application
            return View();
        }
    }
}
