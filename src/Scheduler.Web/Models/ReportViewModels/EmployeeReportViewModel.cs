using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.Models.ReportViewModels
{
    public class EmployeesReportViewModel
    {
        public string Organization { get; set; }
        public List<EmployeeReportViewModel> Employees { get; set; }
    }

    public class EmployeeReportViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmployeeNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string Active { get; set; }
    }

}
