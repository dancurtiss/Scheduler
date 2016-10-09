using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class Organization
    {
        public int OrganizationId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(100)]
        public string ContactName { get; set; }
        [MaxLength(10)]
        public string ContactPhone { get; set; }

        [MaxLength(2000)]
        public string Message { get; set; }
    }
}
