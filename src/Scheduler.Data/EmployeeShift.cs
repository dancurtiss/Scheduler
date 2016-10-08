using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class EmployeeShift
    {
        public int EmployeeShiftId { get; set; }

        public Employee Employee { get; set; }
        public Shift Shift { get; set; }

        public int ConfirmationNumber { get; set; }

        public DateTime ShiftStartTime { get; set; }
        public DateTime ShiftEndTime { get; set; }

        public DateTime AdjustedStartTime { get; set; }
        public DateTime AdjustedEndTime { get; set; }

    }
}
