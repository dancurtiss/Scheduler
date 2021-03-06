﻿using Scheduler.Data;
using Scheduler.Web.Models.ReportViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Scheduler.Web.Data;

namespace Scheduler.Web.Api
{
    public class WeekRollupController : BaseController
    {

        public WeekRollupController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext) : base(appDbContext, schedulerContext)
        {
        }

        protected WeekScheduleReportViewModel CalculateWeekModel(int organizationId, string date)
        {
            WeekScheduleReportViewModel model = new WeekScheduleReportViewModel();

            DateTime startTime = DateTime.Parse(date);
            startTime = StartOfWeek(startTime, DayOfWeek.Sunday);
            DateTime endTime = startTime.AddDays(7);
            endTime = endTime.AddHours(6);

            UserCanAccessOrganization(organizationId);

            var organization = _schedulerContext.Organizations.Single(o => o.OrganizationId == organizationId);

            var employeeShifts = _schedulerContext.EmployeeShifts
                .Include(es => es.Employee)
                .Include(es => es.Employee.Organization)
                .Include(es => es.Shift)
                .Include(es => es.Shift.Position)
                .Where(es => es.Employee.Organization.OrganizationId == organizationId && es.ShiftStartTime > startTime.ToUniversalTime() && es.ShiftEndTime < endTime.ToUniversalTime())
                .ToList();

            var employees = employeeShifts.GroupBy(employeeGroup => employeeGroup.Employee);

            model.Organization = organization.Name;
            model.WeekDescription = startTime.ToString("MM/dd/yyyy") + " - " + endTime.ToString("MM/dd/yyyy");

            model.Employees = new List<EmployeeScheduleReportViewModel>();
            foreach (var employeeGroup in employees)
            {
                EmployeeScheduleReportViewModel employeeModel = new EmployeeScheduleReportViewModel();
                employeeModel.EmployeeNumber = employeeGroup.Key.EmployeeNumber;
                employeeModel.FirstName = employeeGroup.Key.FirstName;
                employeeModel.LastName = employeeGroup.Key.LastName;

                var phone = employeeGroup.Key.PhoneNumber;
                employeeModel.PhoneNumber = string.Format("{0}-{1}-{2}", phone.Substring(0, 3), phone.Substring(3, 3), phone.Substring(6, 4));
                employeeModel.SendPhoneNumber = phone;
                employeeModel.TotalShifts = employeeGroup.Count();

                employeeModel.TotalHours = CalculateTotalHours(employeeGroup.ToList());

                var days = employeeGroup.GroupBy(es => es.ShiftStartTime.ConvertFromUTC(false).Date);
                employeeModel.Days = new List<EmployeeDayReportViewModel>();
                foreach (var dayOfWeek in Enum.GetValues(typeof(DayOfWeek)))
                {
                    var dayGroup = days.SingleOrDefault(dg => dg.Key.DayOfWeek == (DayOfWeek)dayOfWeek);

                    EmployeeDayReportViewModel dayModel = new EmployeeDayReportViewModel();
                    dayModel.DayDate = GetDateOfDay((DayOfWeek)dayOfWeek, startTime);
                    dayModel.Day = dayOfWeek.ToString();
                    dayModel.Shifts = new List<EmployeeShiftReportViewModel>();

                    if (dayGroup == null)
                    {
                        employeeModel.Days.Add(dayModel);
                        continue;
                    }

                    foreach (var shift in dayGroup)
                    {
                        EmployeeShiftReportViewModel shiftModel = new EmployeeShiftReportViewModel();

                        shiftModel.Name = shift.Shift.Position.Name;
                        shiftModel.Category = shift.Shift.Position.Category;
                        shiftModel.StartTime = shift.AdjustedStartTime ?? shift.ShiftStartTime;
                        shiftModel.EndTime = shift.AdjustedEndTime ?? shift.ShiftEndTime;

                        dayModel.Shifts.Add(shiftModel);
                    }

                    employeeModel.Days.Add(dayModel);
                }
                model.Employees.Add(employeeModel);
            }

            model.Employees = model.Employees.OrderBy(e => e.FirstName).ThenBy(e => e.LastName).ToList();

            return model;
        }

        private DateTime GetDateOfDay(DayOfWeek dayOfWeek, DateTime startTime)
        {
            return startTime.AddDays((int)dayOfWeek);
        }

        private static double CalculateTotalHours(List<EmployeeShift> employeeShifts)
        {
            List<CalcShift> shifts = employeeShifts.Select(es => new CalcShift(es)).ToList();
            shifts = shifts.OrderBy(s => s.StartTime).ToList();

            double totalMinutes = 0;
            List<CalcShift> countedShifts = new List<CalcShift>();

            foreach (CalcShift shift in shifts)
            {
                double maxShiftMinutes = shift.EndTime.Subtract(shift.StartTime).TotalMinutes;

                // Need to figure out how to deal with overlapping shifts when they occur
                if (countedShifts.Count > 0)
                {
                    DateTime minStartTime = countedShifts.Min(s => s.StartTime);
                    DateTime maxEndTime = countedShifts.Max(s => s.EndTime);

                    bool startOverlapExists = shift.StartTime >= minStartTime && shift.StartTime <= maxEndTime;
                    bool endOverlapExists = shift.EndTime >= minStartTime && shift.EndTime <= maxEndTime;

                    if (startOverlapExists || endOverlapExists)
                    {
                        double addedStartMinutes = minStartTime.Subtract(shift.StartTime).TotalMinutes;
                        addedStartMinutes = addedStartMinutes < 0 ? 0 : addedStartMinutes;

                        double addedEndMinutes = shift.EndTime.Subtract(maxEndTime).TotalMinutes;
                        addedEndMinutes = addedEndMinutes < 0 ? 0 : addedEndMinutes;

                        double addedMinutes = addedStartMinutes + addedEndMinutes;
                        addedMinutes = addedMinutes < maxShiftMinutes ? addedMinutes : maxShiftMinutes;

                        totalMinutes = totalMinutes + addedMinutes;
                    }
                    else
                    {
                        totalMinutes = totalMinutes + maxShiftMinutes;
                    }
                }
                else
                {
                    totalMinutes = totalMinutes + maxShiftMinutes;
                }

                countedShifts.Add(shift);
            }

            return totalMinutes / 60;
        }

        private DateTime StartOfWeek(DateTime dt, DayOfWeek startOfWeek)
        {
            int diff = dt.DayOfWeek - startOfWeek;
            if (diff < 0)
            {
                diff += 7;
            }
            return dt.AddDays(-1 * diff).Date;
        }

        private class CalcShift
        {
            public CalcShift(EmployeeShift es)
            {
                StartTime = es.AdjustedStartTime ?? es.ShiftStartTime;
                EndTime = es.AdjustedEndTime ?? es.ShiftEndTime;
            }

            public DateTime StartTime { get; set; }
            public DateTime EndTime { get; set; }
        }
    }
}
