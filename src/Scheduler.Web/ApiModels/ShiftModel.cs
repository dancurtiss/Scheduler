using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.ApiModels
{
    public class ShiftModel
    {
        public ShiftModel()
        {

        }

        public ShiftModel(Shift shift)
        {
            ShiftId = shift.ShiftId;

            Day = shift.Day;

            TimeSpan startTime = TimeSpan.Parse(shift.StartTime);
            TimeSpan endTime = TimeSpan.Parse(shift.EndTime);

            StartTime = DateTime.UtcNow.Date.Add(startTime);
            EndTime = DateTime.UtcNow.Date.Add(endTime);

            PositionId = shift.Position.PositionId;
        }

        public int ShiftId { get; set; }

        [Required]
        public string Day { get; set; }
        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }
        [Required]
        public int PositionId { get; set; }


        public Shift Export(List<Position> positions)
        {
            return Export(new Shift(), positions);
        }

        public Shift Export(Shift shift, List<Position> positions)
        {
            shift.StartTime = StartTime.ToUniversalTime().TimeOfDay.ToString(@"hh\:mm");
            shift.EndTime = EndTime.ToUniversalTime().TimeOfDay.ToString(@"hh\:mm");

            shift.Position = positions.Single(p => p.PositionId == PositionId);

            shift.Day = Day;

            return shift;
        }

    }
}
