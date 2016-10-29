using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class EmployeeShift
    {
        public int EmployeeShiftId { get; set; }

        public int ConfirmationNumber { get; set; }

        [Required]
        public DateTime ShiftStartTime { get; set; }
        [Required]
        public DateTime ShiftEndTime { get; set; }

        public DateTime AdjustedStartTime { get; set; }
        public DateTime AdjustedEndTime { get; set; }

        public bool Canceled { get; set; }
        public string CancelReason { get; set; }
        public DateTime? CancelDate { get; set; }

        [Required]
        public Employee Employee { get; set; }
        [Required]
        public Shift Shift { get; set; }
    }
}
