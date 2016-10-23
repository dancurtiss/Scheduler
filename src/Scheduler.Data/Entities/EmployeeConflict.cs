using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class EmployeeConflict
    {
        public int EmployeeConflictId { get; set; }

        [Required]
        public DateTime ConflictStart { get; set; }
        [Required]
        public DateTime ConflictEnd { get; set; }

        [MaxLength(100)]
        public string Reason { get; set; }

        [Required]
        public Employee Employee { get; set; }
    }
}
