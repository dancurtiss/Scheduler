using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class EmployeePosition
    {
        public int EmployeePositionId { get; set; }
        public Employee Employee { get; set; }
        public Position Position { get; set; }

    }
}
