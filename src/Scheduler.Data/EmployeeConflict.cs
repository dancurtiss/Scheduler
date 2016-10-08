using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class EmployeeConflict
    {
        public int EmployeeConflictId { get; set; }
        public DateTime ConflictStart { get; set; }
        public DateTime ConflictEnd { get; set; }

        public string Reason { get; set; }

        public Employee Employee { get; set; }
    }
}
