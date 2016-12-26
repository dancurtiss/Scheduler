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
    public class ReportController : BaseController
    {
        public ReportController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext) : base(appDbContext, schedulerContext)
        {
        }

        [Authorize]
        public IActionResult Week(int organizationId, string date)
        {
            WeekScheduleViewModel model = new WeekScheduleViewModel();

            DateTime startTime = DateTime.Parse(date);
            DateTime endTime = startTime.AddDays(7);

            UserCanAccessOrganization(organizationId);

            var organization = _schedulerContext.Organizations.Single(o => o.OrganizationId == organizationId);

            var employeeShifts = _schedulerContext.EmployeeShifts
                .Include(es => es.Employee)
                .Include(es => es.Shift)
                .Include(es => es.Shift.Position)
                .Where(es => es.ShiftStartTime > startTime && es.ShiftEndTime < endTime)
                .ToList();

            var employees = employeeShifts.GroupBy(employeeGroup => employeeGroup.Employee);

            model.Organization = organization.Name;
            model.WeekDescription = startTime.ToString("MM/dd/yyyy") + " - " + endTime.ToString("MM/dd/yyyy");

            model.Employees = new List<EmployeeScheduleModel>();
            foreach(var employeeGroup in employees)
            {
                EmployeeScheduleModel employeeModel = new EmployeeScheduleModel();
                employeeModel.EmployeeNumber = employeeGroup.Key.EmployeeNumber;
                employeeModel.FirstName = employeeGroup.Key.FirstName;
                employeeModel.LastName = employeeGroup.Key.LastName;

                var phone = employeeGroup.Key.PhoneNumber;
                employeeModel.PhoneNumber = string.Format("{0}-{1}-{2}", phone.Substring(0, 3), phone.Substring(3, 3), phone.Substring(6, 4));
                employeeModel.TotalShifts = employeeGroup.Count();
                employeeModel.TotalHours = employeeGroup.Sum(es => es.ShiftEndTime.Subtract(es.ShiftStartTime).TotalMinutes)/60;

                var days = employeeGroup.GroupBy(es => es.ShiftStartTime.Date);
                employeeModel.Days = new List<EmployeeDayModel>();
                foreach(var dayGroup in days)
                {
                    EmployeeDayModel dayModel = new EmployeeDayModel();
                    dayModel.Day = dayGroup.Key.DayOfWeek.ToString();
                    dayModel.Shifts = new List<EmployeeShiftModel>();
                    
                    foreach(var shift in dayGroup)
                    {
                        EmployeeShiftModel shiftModel = new EmployeeShiftModel();

                        shiftModel.Name = shift.Shift.Position.Name;
                        shiftModel.Category = shift.Shift.Position.Category;
                        shiftModel.StartTime = shift.ShiftStartTime;
                        shiftModel.EndTime = shift.ShiftEndTime;

                        dayModel.Shifts.Add(shiftModel);
                    }

                    employeeModel.Days.Add(dayModel);
                }
                model.Employees.Add(employeeModel);
            }

            return View(model);
        }
    }
}
