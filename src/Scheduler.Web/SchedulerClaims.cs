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
            { PermissionClaimType.Organizations_Manage, new SchedulerPermission(PermissionClaimType.Organizations_Manage, "Manage Organizations", "organizations.manage") }
        };
    }

    public enum CustomClaimType
    {
        Permissions
    }

    public enum PermissionClaimType
    {
        Organizations_Manage
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
