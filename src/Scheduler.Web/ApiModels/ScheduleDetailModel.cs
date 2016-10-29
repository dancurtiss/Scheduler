using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.ApiModels
{
    public class ScheduleDetailModel
    {
        public ScheduleDetailModel(Schedule schedule, List<Shift> shifts, List<Position> positions)
        {
            ScheduleId = schedule.ScheduleId;
            Name = schedule.Name;
            StartDate = schedule.StartDate;
            EndDate = schedule.EndDate;
            IsActive = schedule.IsActive;

            Shifts = shifts.Select(s => new ShiftModel(s)).ToList();
            Positions = positions.Select(p => new PositionModel(p)).ToList();
        }

        public int ScheduleId { get; set; }

        public string Name { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public bool IsActive { get; set; }


        public List<ShiftModel> Shifts { get; set; }

        public List<PositionModel> Positions { get; set; }
    }
}
