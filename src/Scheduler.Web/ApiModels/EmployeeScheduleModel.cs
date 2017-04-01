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
        public EmployeeScheduleModel(DateTime startDate, DateTime endDate, List<EmployeeShift> employeeShifts, List<EmployeeConflict> employeeConflicts, List<Shift> shifts, List<Employee> employees)
        {
            StartDate = startDate;
            EndDate = endDate;

            Shifts = shifts.Select(s => new ShiftDisplayModel(s)).ToList();
            Employees = employees.Select(e => new EmployeeDisplayModel(e)).ToList();
            EmployeeShifts = employeeShifts.Select(es => new EmployeeShiftModel(es)).ToList();
            EmployeeConflicts = employeeConflicts.Select(ec => new EmployeeConflictModel(ec)).ToList();

            Shifts = Shifts.OrderBy(s => s.PositionCategory).ThenBy(s => s.PositionName).ThenBy(s => s.ShiftStartMinute).ToList();
            PositionCategories = Shifts.Select(s => s.PositionCategory).Distinct().ToList();
        }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public List<string> PositionCategories { get; set; }
        public List<ShiftDisplayModel> Shifts { get; set; }
        public List<EmployeeDisplayModel> Employees { get; set; }
        public List<EmployeeShiftModel> EmployeeShifts { get; set; }
        public List<EmployeeConflictModel> EmployeeConflicts { get; set; }
    }

    public class EmployeeShiftModel
    {
        public EmployeeShiftModel(EmployeeShift employeeShift)
        {
            EmployeeShiftId = employeeShift.EmployeeShiftId;
            EmployeeId = employeeShift.Employee.EmployeeId;
            ShiftId = employeeShift.Shift.ShiftId;
            Canceled = employeeShift.Canceled;
            Reason = employeeShift.CancelReason;
        }

        public int EmployeeShiftId { get; set; }
        public int EmployeeId { get; set; }
        public int ShiftId { get; set; }
        public bool Canceled { get; set; }
        public string Reason { get; set; }
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

            TimeSpan startSpan = TimeSpan.Parse(shift.StartTime);
            TimeSpan endSpan = TimeSpan.Parse(shift.EndTime);

            DateTime timeStart = DateTime.UtcNow.Date.Add(startSpan);
            DateTime timeEnd = DateTime.UtcNow.Date.Add(endSpan);

            ShiftTime = timeStart.ConvertFromUTC(true).ToString("hh:mm tt") + "-" + timeEnd.ConvertFromUTC(true).ToString("hh:mm tt");

            ShiftStartMinute = startSpan.TotalMinutes;
            ShiftEndMinute = endSpan.TotalMinutes;
        }

        public int ShiftId { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public string PositionCategory { get; set; }
        public string ShiftDay { get; set; }
        public string ShiftTime { get; set; }
        public double ShiftStartMinute { get; set; }
        public double ShiftEndMinute { get; set; }
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

    public class CopyWeekModel
    {
        public DateTime StartDate { get; set; }
    }

    public class SendSMSModel
    {
        public DateTime ScheduleDate { get; set; }
    }

    public class CopyDayModel
    {
        public DateTime ScheduleDate { get; set; }
        public string FromDay { get; set; }
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
