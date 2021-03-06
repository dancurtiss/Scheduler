﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Scheduler.Data;
using Scheduler.Web.ApiModels;
using Microsoft.EntityFrameworkCore;
using Scheduler.Web.Data;

namespace Scheduler.Web.Api
{
    [Route("api/[controller]")]
    [Authorize("Manage Organization Details")]
    public class ShiftController : BaseController
    {
        public ShiftController(ApplicationDbContext appDbContext, SchedulerContext schedulerContext) : base(appDbContext, schedulerContext)
        {
        }

        [HttpGet("{id}")]
        public ScheduleDetailModel Get(int id)
        {
            Schedule schedule = GetSchedule(id);

            UserCanAccessOrganization(schedule.Organization.OrganizationId);

            List<Shift> shifts = _schedulerContext.Shifts.Where(s => s.Schedule.ScheduleId == id).ToList();
            List<Position> positions = GetAvailableSchedulePositions(schedule);

            ScheduleDetailModel model = new ScheduleDetailModel(schedule, shifts, positions);

            return model;
        }

        [HttpPost("{id}")]
        public IActionResult Post(int id, [FromQuery]bool? copyAllDays, [FromBody]ShiftModel shift)
        {
            if (shift == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            Schedule schedule = GetSchedule(id);

            UserCanAccessOrganization(schedule.Organization.OrganizationId);

            var positions = GetAvailableSchedulePositions(schedule);

            if (copyAllDays.HasValue && copyAllDays.Value)
            {
                foreach(DayOfWeek day in Enum.GetValues(typeof(DayOfWeek)))
                {
                    var shiftEntity = shift.Export(positions);
                    shiftEntity.Day = day.ToString();
                    shiftEntity.Schedule = schedule;

                    _schedulerContext.Shifts.Add(shiftEntity);
                }
            }
            else
            {
                var shiftEntity = shift.Export(positions);
                shiftEntity.Schedule = schedule;

                _schedulerContext.Shifts.Add(shiftEntity);
            }

            _schedulerContext.SaveChanges();

            return new ObjectResult(shift);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ShiftModel shift)
        {
            if (shift == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ObjectResult(ModelState);
            }

            var shiftEntity = _schedulerContext.Shifts
                .Include(s => s.Schedule)
                .Include(s => s.Schedule.Organization)
                .Single(o => o.ShiftId == id);

            UserCanAccessOrganization(shiftEntity.Schedule.Organization.OrganizationId);

            shift.Export(shiftEntity, GetAvailableSchedulePositions(shiftEntity.Schedule));
            _schedulerContext.SaveChanges();

            return new ObjectResult(shift);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var shiftEntity = _schedulerContext.Shifts
                .Include(s => s.Schedule)
                .Include(s => s.Schedule.Organization)
                .Single(o => o.ShiftId == id);

            UserCanAccessOrganization(shiftEntity.Schedule.Organization.OrganizationId);

            _schedulerContext.Shifts.Remove(shiftEntity);
            _schedulerContext.SaveChanges();
        }

        private Schedule GetSchedule(int id)
        {
            return _schedulerContext.Schedules.Include(s => s.Organization).Single(s => s.ScheduleId == id);
        }

        private List<Position> GetAvailableSchedulePositions(Schedule schedule)
        {
            return _schedulerContext.Positions.Where(p => p.Organization.OrganizationId == schedule.Organization.OrganizationId).ToList();
        }

    }
}
