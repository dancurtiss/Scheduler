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
        public string EmployeeDetails { get; set; }
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
            ConflictDate = employeeConflict.ConflictStart.Date.ConvertFromUTC(false);
            StartHour = employeeConflict.ConflictStart.ConvertFromUTC(false).Hour;
            EndHour = employeeConflict.ConflictEnd.ConvertFromUTC(false).Hour;
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

            var universalConflictDate = this.ConflictDate.ToUniversalTime();

            employeeConflict.ConflictStart = universalConflictDate.AddHours(StartHour.HasValue ? StartHour.Value : 0);
            employeeConflict.ConflictEnd = universalConflictDate.AddHours(EndHour.HasValue ? EndHour.Value : 24);

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
            ShiftStartTime = employeeShift.ShiftStartTime;
            ShiftEndTime = employeeShift.ShiftEndTime;
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
