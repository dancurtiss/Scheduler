using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.ApiModels
{
    public class EmployeeScheduleModel
    {
        public EmployeeScheduleModel(DateTime startDate, DateTime endDate, List<EmployeeShift> employeeShifts, List<Shift> shifts, List<Employee> employees)
        {

        }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public List<ShiftDisplayModel> Shifts { get; set; }
        public List<EmployeeDisplayModel> Employees { get; set; }
        public List<EmployeeShiftModel> EmployeeShifts { get; set; }
    }

    public class EmployeeShiftModel
    {
        public int EmployeeId { get; set; }
        public int ShiftId { get; set; }
    }

    public class ShiftDisplayModel
    {
        public int ShiftId { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public string PositionCategory { get; set; }
        public string ShiftDay { get; set; }
        public string ShiftTime { get; set; }
    }

    public class EmployeeDisplayModel
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

        public List<int> PositionIds { get; set; }
    }
}
