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

            TimeSpan startTime = TimeSpan.Parse(shift.StartTime);

            StartHour = startTime.Hours < 12 ? startTime.Hours : startTime.Hours - 12;
            StartMinute = startTime.Minutes;
            IsStartAM = startTime.Hours < 12;

            TimeSpan endTime = TimeSpan.Parse(shift.EndTime);

            EndHour = endTime.Hours < 12 ? endTime.Hours : endTime.Hours - 12;
            EndMinute = endTime.Minutes;
            IsEndAM = endTime.Hours < 12;

            PositionId = shift.Position.PositionId;
        }

        public int ShiftId { get; set; }

        [Required]
        public int StartHour { get; set; }
        [Required]
        public int StartMinute { get; set; }
        [Required]
        public bool IsStartAM { get; set; }
        [Required]
        public int EndHour { get; set; }
        [Required]
        public int EndMinute { get; set; }
        [Required]
        public bool IsEndAM { get; set; }

        [Required]
        public int PositionId { get; set; }


        public Shift Export(List<Position> positions)
        {
            return Export(new Shift(), positions);
        }

        public Shift Export(Shift shift, List<Position> positions)
        {
            if (IsStartAM)
            {
                StartHour += 12;
            }

            TimeSpan startTime = new TimeSpan(StartHour, StartMinute, 0);

            if (IsEndAM)
            {
                EndHour += 12;
            }

            TimeSpan endTime = new TimeSpan(EndHour, EndMinute, 0);

            shift.StartTime = startTime.ToString();
            shift.EndTime = endTime.ToString();

            shift.Position = positions.Single(p => p.PositionId == PositionId);

            return shift;
        }

    }
}
