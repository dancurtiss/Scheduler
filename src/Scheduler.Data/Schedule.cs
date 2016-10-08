using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class Schedule
    {
        public int ScheduleId { get; set; }
        public string Name { get; set; }

        public Organization Organization { get; set; }
    }
}
