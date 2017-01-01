using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.ApiModels
{
    public class EmployeeDetailModel
    {
        public int OrganizationId { get; set; }
        public string OrganizationMessage { get; set; }
        public string EmployeeName { get; set; }
        public List<EmployeeConflictModel> Conflicts { get; set; }
        public List<EmployeeShiftDisplayModel> Shifts { get; set; }
    }

    public class EmployeeConflictModel
    {
        public EmployeeConflictModel()
        {

        }

        public EmployeeConflictModel(EmployeeConflict employeeConflict)
        {
            EmployeeConflictId = employeeConflict.EmployeeConflictId;
            EmployeeId = employeeConflict.Employee.EmployeeId;
            ConflictDate = employeeConflict.ConflictStart.ToLocalTime().Date;
            StartHour = employeeConflict.ConflictStart.Hour;
            EndHour = employeeConflict.ConflictEnd.Hour;
            Reason = employeeConflict.Reason;
        }

        public int EmployeeConflictId { get; set; }
        public int EmployeeId { get; set; }

        [Required]
        public DateTime ConflictDate { get; set; }

        public int? StartHour { get; set; }
        public int? EndHour { get; set; }

        [MaxLength(100)]
        public string Reason { get; set; }

        public EmployeeConflict Export()
        {
            return Export(new EmployeeConflict());
        }

        public EmployeeConflict Export(EmployeeConflict employeeConflict)
        {
            employeeConflict.EmployeeConflictId = this.EmployeeConflictId;
            employeeConflict.ConflictStart = this.ConflictDate.Date.AddHours(StartHour.HasValue ? StartHour.Value : 0);
            employeeConflict.ConflictEnd = this.ConflictDate.Date.AddHours(EndHour.HasValue ? EndHour.Value : 24);
            employeeConflict.Reason = this.Reason;

            return employeeConflict;
        }

    }

    public class EmployeeShiftDisplayModel
    {
        public EmployeeShiftDisplayModel(EmployeeShift employeeShift)
        {
            EmployeeShiftId = employeeShift.EmployeeShiftId;
            ShiftId = employeeShift.Shift.ShiftId;
            PositionName = employeeShift.Shift.Position.Name;
            PositionCategory = employeeShift.Shift.Position.Category;
            ShiftStartTime = DateTime.SpecifyKind(employeeShift.ShiftStartTime, DateTimeKind.Local);
            ShiftEndTime = DateTime.SpecifyKind(employeeShift.ShiftEndTime, DateTimeKind.Local);
            Cancelled = employeeShift.Canceled;
            CancelReason = employeeShift.CancelReason;
        }

        public int EmployeeShiftId { get; set; }
        public int ShiftId { get; set; }
        public string PositionName { get; set; }
        public string PositionCategory { get; set; }

        public DateTime ShiftStartTime { get; set; }
        public DateTime ShiftEndTime { get; set; }

        public bool Cancelled { get; set; }
        public string CancelReason { get; set; }
    }

}
