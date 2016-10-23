using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.ApiModels
{
    public class PositionModel
    {
        public PositionModel()
        {

        }

        public PositionModel(Position position)
        {
            PositionId = position.PositionId;
            Name = position.Name;
            Category = position.Category;
        }

        public int PositionId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Category { get; set; }

        public Position Export()
        {
            return Export(new Position());
        }

        public Position Export(Position position)
        {
            position.Name = this.Name;
            position.Category = this.Category;

            return position;
        }

    }
}
