using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.ApiModels
{
    public class OrganizationModel
    {
        public OrganizationModel()
        {

        }

        public OrganizationModel(Organization organization)
        {
            OrganizationId = organization.OrganizationId;
            Name = organization.Name;
            ContactName = organization.ContactName;
            ContactPhone = organization.ContactPhone;
            Message = organization.Message;
        }

        public int OrganizationId { get; set; }
        [Required]
        public string Name { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string Message { get; set; }

        public Organization Export()
        {
            return Export(new Organization());
        }

        public Organization Export(Organization organization)
        {
            organization.Name = this.Name;
            organization.ContactName = this.ContactName;
            organization.ContactPhone = this.ContactPhone;
            organization.Message = this.Message;

            return organization;
        }

    }
}
