using Microsoft.AspNetCore.Mvc;
using Scheduler.Data;
using Scheduler.Web.Data;
using Scheduler.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Scheduler.Web.Api
{
    public abstract class BaseController : Controller
    {
        protected ApplicationDbContext _appDbContext;
        protected SchedulerContext _schedulerContext;

        public BaseController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext)
        {
            _appDbContext = appDbContext;
            _schedulerContext = schedulerContext;
        }

        protected bool UserHasPermission(PermissionClaimType permission)
        {
            return User.HasClaim(SchedulerClaims.CustomClaimTypes[CustomClaimType.Permissions], SchedulerClaims.PermissionClaimTypes[permission].ClaimName);
        }

        protected void UserCanAccessEmployee(int employeeId)
        {
            if (UserHasPermission(PermissionClaimType.Organization_Manage))
            {
                return;
            }

            if (UserHasPermission(PermissionClaimType.Employee_Details) && LoggedInUser.EmployeeId == employeeId)
            {
                return;
            }

            if (UserHasPermission(PermissionClaimType.Organization_Details))
            {
                var employeeOrganizationId = _schedulerContext.Employees.Include(e => e.Organization).Single(e => e.EmployeeId == employeeId).Organization.OrganizationId;
                if (LoggedInUser.OrganizationId == employeeOrganizationId)
                {
                    return;
                }
            }

            throw new UnauthorizedAccessException(string.Format("Cannot access employee: {0}.", employeeId));
        }

        protected void UserCanAccessOrganization(int organizationId)
        {
            if (UserHasPermission(PermissionClaimType.Organization_Manage))
            {
                return;
            }

            if (UserHasPermission(PermissionClaimType.Organization_Details) && LoggedInUser.OrganizationId == organizationId)
            {
                return;
            }

            throw new UnauthorizedAccessException(string.Format("Cannot access organization: {0}.", organizationId));
        }

        private ApplicationUser _loggedInUser;
        protected ApplicationUser LoggedInUser
        {
            get
            {
                if (_loggedInUser != null)
                {
                    return _loggedInUser;
                }

                _loggedInUser = _appDbContext.Users.SingleOrDefault(u => u.UserName == User.Identity.Name);

                return _loggedInUser;
            }
        }
    }
}
