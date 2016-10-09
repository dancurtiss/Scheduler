using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public class OrganizationRepository
    {
        SchedulerContext _context = null;

        public OrganizationRepository(SchedulerContext context)
        {
            _context = context;
        }

        public Organization CreateOrganization(Organization organization)
        {
            _context.Organizations.Add(organization);

            return organization;
        }


    }
}
