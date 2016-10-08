using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class Shift      
    {
        public int ShiftId { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

        public Position Position { get; set; }
        public Schedule Schedule { get; set; }
    }
}
