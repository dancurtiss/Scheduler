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

        protected bool UserCanAccessEmployee(int employeeId)
        {
            if (UserHasPermission(PermissionClaimType.Employee_Details))
            {
                return LoggedInUser.EmployeeId == employeeId;
            }

            if (UserHasPermission(PermissionClaimType.Organization_Details))
            {
                var employeeOrganizationId = _schedulerContext.Employees.Include(e => e.Organization).Single(e => e.EmployeeId == employeeId).Organization.OrganizationId;
                return LoggedInUser.OrganizationId == employeeOrganizationId;
            }

            if (UserHasPermission(PermissionClaimType.Organization_Manage))
            {
                return true;
            }

            return false;
        }

        protected bool UserCanAccessOrganization(int organizationId)
        {
            if (UserHasPermission(PermissionClaimType.Organization_Details))
            {
                return LoggedInUser.OrganizationId == organizationId;
            }

            if (UserHasPermission(PermissionClaimType.Organization_Manage))
            {
                return true;
            }

            return false;
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
