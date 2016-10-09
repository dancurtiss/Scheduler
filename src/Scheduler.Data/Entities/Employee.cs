using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class Employee      
    {
        public int EmployeeId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(10)]
        public string EmployeeNumber { get; set; }

        [Required]
        [MaxLength(10)]
        public string PhoneNumber { get; set; }

        public Organization Organization { get; set; }
    }
}
