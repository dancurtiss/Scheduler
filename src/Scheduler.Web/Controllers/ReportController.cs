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

        [Authorize]
        public IActionResult Employees(int organizationId)
        {
            UserCanAccessOrganization(organizationId);

            EmployeesReportViewModel model = new EmployeesReportViewModel();

            model.Organization = _schedulerContext.Organizations.Single(o => o.OrganizationId == organizationId).Name;
            var employees = _schedulerContext.Employees.Where(e => e.Organization.OrganizationId == organizationId && e.IsActive == true);
            model.Employees = employees.Select(e => new EmployeeReportViewModel {
                FirstName = e.FirstName,
                LastName = e.LastName,
                EmployeeNumber = e.EmployeeNumber,
                PhoneNumber = e.PhoneNumber,
                Active = e.IsActive ? "Active" : "Inactive"
            }).ToList();

            model.Employees.ForEach(e => {
                if (!string.IsNullOrEmpty(e.PhoneNumber) && e.PhoneNumber.Length == 10)
                {
                    e.PhoneNumber = string.Format("({0}) {1}-{2}", e.PhoneNumber.Substring(0, 3), e.PhoneNumber.Substring(3,3), e.PhoneNumber.Substring(6,4));
                }
            });

            return View(model);
        }

    }
}
