using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web
{
    public static class SchedulerClaims
    {
        public static Dictionary<CustomClaimType, string> CustomClaimTypes = new Dictionary<CustomClaimType, string>
        {
            { CustomClaimType.Permissions, "permissions" }
        };

        public static Dictionary<PermissionClaimType, SchedulerPermission> PermissionClaimTypes = new Dictionary<PermissionClaimType, SchedulerPermission>
        {
            { PermissionClaimType.Organization_Manage, new SchedulerPermission(PermissionClaimType.Organization_Manage, "Manage Organizations", "organizations.manage") },
            { PermissionClaimType.Organization_Details, new SchedulerPermission(PermissionClaimType.Organization_Details, "Manage Organization Details", "organizations.details") },
            { PermissionClaimType.Employee_Manage, new SchedulerPermission(PermissionClaimType.Employee_Manage, "Manage Employees", "employee.manage") },
            { PermissionClaimType.Employee_Details, new SchedulerPermission(PermissionClaimType.Employee_Details, "Manage Employee Details", "employee.details") },
            { PermissionClaimType.System_Setup, new SchedulerPermission(PermissionClaimType.System_Setup, "Manage System Setup", "system.manage") },
        };
    }

    public enum CustomClaimType
    {
        Permissions
    }

    public enum PermissionClaimType
    {
        Organization_Manage,
        Organization_Details,
        Employee_Manage,
        Employee_Details,
        System_Setup
    }

    public class SchedulerPermission
    {
        public SchedulerPermission(PermissionClaimType permissionType, string policyName, string claimName)
        {
            Permission = permissionType;
            PolicyName = policyName;
            ClaimName = claimName;
        }
        public PermissionClaimType Permission { get; set; }
        public string PolicyName { get; set; }
        public string ClaimName { get; set; }
    }
}
