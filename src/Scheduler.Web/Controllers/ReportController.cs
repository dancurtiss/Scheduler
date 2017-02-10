using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Web.Data;
using Scheduler.Web.Api;
using Scheduler.Data;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Web.Models.ReportViewModels;
using Microsoft.EntityFrameworkCore;

namespace Scheduler.Web.Controllers
{
    public class ReportController : WeekRollupController
    {
        public ReportController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext) : base(appDbContext, schedulerContext)
        {
        }

        [Authorize]
        public IActionResult Week(int organizationId, string date)
        {
            WeekScheduleReportViewModel model = CalculateWeekModel(organizationId, date);

            return View(model);
        }

    }
}
