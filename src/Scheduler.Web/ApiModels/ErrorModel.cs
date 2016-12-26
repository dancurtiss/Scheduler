using Newtonsoft.Json;
using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.ApiModels
{
    public class ErrorModel
    {
        public ErrorModel()
        {

        }

        public int code { get; set; }
        public string message { get; set; }

        // other fields

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
