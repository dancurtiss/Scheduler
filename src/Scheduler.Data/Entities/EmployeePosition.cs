using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class EmployeePosition
    {
        public int EmployeePositionId { get; set; }
        [Required]
        public Employee Employee { get; set; }
        [Required]
        public Position Position { get; set; }

    }
}
