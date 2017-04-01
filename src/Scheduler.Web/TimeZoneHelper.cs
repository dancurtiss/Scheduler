using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web
{
    public static class TimeZoneHelper
    {

        public static DateTime ConvertToUTC(this DateTime date, bool adjustForStaticShift)
        {
            TimeZoneInfo convertZone = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");

            // taking dst out of it
            if (adjustForStaticShift && convertZone.IsDaylightSavingTime(date))
            {
                date = date.AddHours(1);
            }

            if (date.Kind == DateTimeKind.Utc) return date;

            DateTime convertTime = TimeZoneInfo.ConvertTime(date, convertZone, TimeZoneInfo.Utc);

            return convertTime;
        }

        public static DateTime ConvertStaticShift(this DateTime date)
        {
            TimeZoneInfo convertZone = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");

            // taking dst out of it
            if (convertZone.IsDaylightSavingTime(date))
            {
                date = date.AddHours(-1);
            }

            return date;
        }

        public static DateTime ConvertFromUTC(this DateTime date, bool adjustForStaticShift)
        {
            TimeZoneInfo convertZone = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");

            // taking dst out of it
            if (adjustForStaticShift && convertZone.IsDaylightSavingTime(date))
            {
                date = date.AddHours(-1);
            }

            if (date.Kind == DateTimeKind.Local) return date;

            DateTime convertTime = TimeZoneInfo.ConvertTime(date, TimeZoneInfo.Utc, convertZone);

            return convertTime;
        }

        public static bool IsUtcTimeNextLocalDay(this TimeSpan time)
        {
            DateTime utcDateTime = DateTime.UtcNow.Date.Add(time);
            TimeZoneInfo convertZone = TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time");
            DateTime convertTime = TimeZoneInfo.ConvertTime(utcDateTime, TimeZoneInfo.Utc, convertZone);

            // taking dst out of it
            if (convertZone.IsDaylightSavingTime(convertTime))
            {
                convertTime = convertTime.AddHours(-1);
            }


            return utcDateTime.Day != convertTime.Day;
        }

    }
}
