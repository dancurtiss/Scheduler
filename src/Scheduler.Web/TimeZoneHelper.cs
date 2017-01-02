using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web
{
    public static class TimeZoneHelper
    {

        public static DateTime ConvertToUTC(this DateTime date)
        {
            if (date.Kind == DateTimeKind.Utc) return date;

            TimeZoneInfo convertZone = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");
            DateTime convertTime = TimeZoneInfo.ConvertTime(date, convertZone, TimeZoneInfo.Utc);
            return convertTime;
        }

        public static DateTime ConvertFromUTC(this DateTime date)
        {
            if (date.Kind == DateTimeKind.Local) return date;

            TimeZoneInfo convertZone = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");
            DateTime convertTime = TimeZoneInfo.ConvertTime(date, TimeZoneInfo.Utc, convertZone);
            return convertTime;
        }

        public static bool IsUtcTimeNextLocalDay(this TimeSpan time)
        {
            DateTime utcDateTime = DateTime.UtcNow.Date.Add(time);
            TimeZoneInfo convertZone = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");
            DateTime convertedTime = TimeZoneInfo.ConvertTime(utcDateTime, TimeZoneInfo.Utc, convertZone);

            return utcDateTime.Day != convertedTime.Day;
        }

    }
}
