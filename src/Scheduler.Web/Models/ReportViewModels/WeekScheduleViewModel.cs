using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.Models.ReportViewModels
{
    public class WeekScheduleViewModel
    {
        public string Organization { get; set; }
        public string WeekDescription { get; set; }
        public List<EmployeeScheduleModel> Employees { get; set; }
    }

    public class EmployeeScheduleModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmployeeNumber { get; set; }
        public string PhoneNumber { get; set; }

        public double TotalHours { get; set; }
        public int TotalShifts { get; set; }

        public List<EmployeeDayModel> Days { get; set; }
    }

    public class EmployeeDayModel
    {
        public string Day { get; set; }
        public List<EmployeeShiftModel> Shifts { get; set; }
    }

    public class EmployeeShiftModel
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
