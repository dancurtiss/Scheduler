using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.ApiModels
{
    public class ScheduleModel
    {
        public ScheduleModel()
        {

        }

        public ScheduleModel(Schedule schedule)
        {
            ScheduleId = schedule.ScheduleId;
            Name = schedule.Name;
            StartDate = schedule.StartDate;
            EndDate = schedule.EndDate;
            IsActive = schedule.IsActive;
        }

        public int ScheduleId { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public bool IsActive { get; set; }


        public Schedule Export()
        {
            return Export(new Schedule());
        }

        public Schedule Export(Schedule schedule)
        {
            schedule.Name = this.Name;
            schedule.StartDate = this.StartDate;
            schedule.EndDate = this.EndDate;
            schedule.IsActive = this.IsActive;

            return schedule;
        }

    }
}
