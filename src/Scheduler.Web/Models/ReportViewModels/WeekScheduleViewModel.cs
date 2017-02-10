using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.Models.ReportViewModels
{
    public class WeekScheduleReportViewModel
    {
        public string Organization { get; set; }
        public string WeekDescription { get; set; }
        public List<EmployeeScheduleReportViewModel> Employees { get; set; }
    }

    public class EmployeeScheduleReportViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmployeeNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string SendPhoneNumber { get; set; }

        public double TotalHours { get; set; }
        public int TotalShifts { get; set; }

        public List<EmployeeDayReportViewModel> Days { get; set; }
    }

    public class EmployeeDayReportViewModel
    {
        public string Day { get; set; }
        public List<EmployeeShiftReportViewModel> Shifts { get; set; }
    }

    public class EmployeeShiftReportViewModel
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
