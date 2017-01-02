using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web
{
    public static class TimeZoneHelper
    {

        public static DateTime Convert(this DateTime fromTime)
        {
            TimeZoneInfo convertZone = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");
            DateTime convertTime = TimeZoneInfo.ConvertTime(fromTime, TimeZoneInfo.Utc, convertZone);
            return convertTime;
        }
    }
}
