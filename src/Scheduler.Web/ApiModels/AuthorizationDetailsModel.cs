using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.ApiModels
{
    public class AuthorizationDetailsModel
    {
        public AuthorizationDetailsModel()
        {

        }

        public AuthorizationDetailsModel(string username, List<string> permissions)
        {
            Username = username;
            Permissions = permissions;
        }

        public string Username { get; set; }
        public List<string> Permissions { get; set; }

    }
}
