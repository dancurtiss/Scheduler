using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class Shift      
    {
        public int ShiftId { get; set; }

        [Required]
        [MaxLength(10)]
        public string StartTime { get; set; }
        [Required]
        [MaxLength(10)]
        public string EndTime { get; set; }

        public Position Position { get; set; }
        public Schedule Schedule { get; set; }
    }
}
