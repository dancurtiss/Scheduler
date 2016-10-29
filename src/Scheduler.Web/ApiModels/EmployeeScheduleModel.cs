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
            StartDate = startDate;
            EndDate = endDate;

            Shifts = shifts.Select(s => new ShiftDisplayModel(s)).ToList();
            Employees = employees.Select(e => new EmployeeDisplayModel(e)).ToList();
            EmployeeShifts = employeeShifts.Select(es => new EmployeeShiftModel(es)).ToList();
        }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public List<ShiftDisplayModel> Shifts { get; set; }
        public List<EmployeeDisplayModel> Employees { get; set; }
        public List<EmployeeShiftModel> EmployeeShifts { get; set; }
    }

    public class EmployeeShiftModel
    {
        public EmployeeShiftModel(EmployeeShift employeeShift)
        {
            EmployeeId = employeeShift.Employee.EmployeeId;
            ShiftId = employeeShift.Shift.ShiftId;
        }

        public int EmployeeId { get; set; }
        public int ShiftId { get; set; }
    }

    public class ShiftDisplayModel
    {
        public ShiftDisplayModel(Shift shift)
        {
            ShiftId = shift.ShiftId;
            PositionId = shift.Position.PositionId;
            PositionName = shift.Position.Name;
            PositionCategory = shift.Position.Category;

            ShiftDay = shift.Day;
            ShiftTime = shift.StartTime + "-" + shift.EndTime;
        }

        public int ShiftId { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public string PositionCategory { get; set; }
        public string ShiftDay { get; set; }
        public string ShiftTime { get; set; }
    }

    public class EmployeeDisplayModel
    {
        public EmployeeDisplayModel(Employee employee)
        {
            EmployeeId = employee.EmployeeId;
            FirstName = employee.FirstName;
            LastName = employee.LastName;
            PhoneNumber = employee.PhoneNumber;

            PositionIds = employee.Positions.Select(p => p.Position.PositionId).ToList();
        }
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

        public List<int> PositionIds { get; set; }
    }

    public class AddEmployeeShiftModel
    {
        public int EmployeeId { get; set; }
        public int ShiftId { get; set; }
        public DateTime ShiftDate { get; set; }
    }

    public class CancelEmployeeShiftModel
    {
        public int EmployeeShiftId { get; set; }
        public string Reason { get; set; }
    }

}
