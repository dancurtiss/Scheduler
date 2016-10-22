using Scheduler.Data;
using System;
using System.Collections.Generic;
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
        public string Name { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string Message { get; set; }

        public Organization Export()
        {
            return new Organization
            {
                OrganizationId = this.OrganizationId,
                Name = this.Name,
                ContactName = this.ContactName,
                ContactPhone = this.ContactPhone,
                Message = this.Message
            };
        }

    }
}
