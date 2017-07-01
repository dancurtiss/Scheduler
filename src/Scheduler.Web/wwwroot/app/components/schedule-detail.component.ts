import { Component, OnInit }                                from '@angular/core';
import { Router, ActivatedRoute, Params }                   from '@angular/router';
import { Shift, Schedule, ScheduleDetails, Position }       from '../models/schedule';
import { ShiftService } from '../services/shift.service';
import { ScheduleService } from '../services/schedule.service';

import * as moment from 'moment'

@Component({
    moduleId: module.id,
    selector: 'my-schedule-detail',
    templateUrl: 'schedule-detail.component.html',
    styleUrls: ['schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {

    showDay: string = 'all';

    organizationId: number;
    scheduleId: number;
    scheduleName: string;
    scheduleStart: Date;
    scheduleEnd: Date;

    copyAllDays: boolean;
    copyFromDay: string;
    copyToDay: string;

    shifts: Shift[];
    positions: Position[];
    selectedShift: Shift;

    copyDayErrors: string[] = [];
    shiftErrors: string[] = [];

    days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    constructor(
        private scheduleService: ScheduleService,
        private shiftService: ShiftService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    getScheduleDetails(): void {
        this.shiftService.getShifts(this.scheduleId).then((scheduleDetails) => {
            this.organizationId = scheduleDetails.organizationId;
            this.scheduleName = scheduleDetails.name;
            this.scheduleStart = scheduleDetails.startDate;
            this.scheduleEnd = scheduleDetails.endDate;
            this.positions = scheduleDetails.positions;
            this.shifts = scheduleDetails.shifts;

            this.shifts.forEach((s) => {
                s.startTimeDisplay = moment(s.startTime).format('LT');
                s.endTimeDisplay = moment(s.endTime).format('LT');
            });
        });
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.scheduleId = id;
        });

        this.getScheduleDetails();
    }

    getDayShifts(day: string) {
        if (!this.shifts) return [];

        return this.shifts.filter((s) => { return s.day == day; });
    }

    positionName(positionId: number, positions: Position[]): string {
        return positions.filter((p) => { return p.positionId == positionId; })[0].name;
    }

    onAddShift(day): void {
        var startTime = new Date();
        var endTime = new Date();

        startTime.setHours(8, 0);
        endTime.setHours(16, 0);

        this.selectedShift = { shiftId: 0, day: day, startTime: startTime, endTime: endTime, positionId: 0 };
    }

    onSaveShift(copyAllDays: boolean): void {
        this.shiftErrors = [];
        if (!this.selectedShift.day) {
            this.shiftErrors.push('Day is required.');
        }
        if (!this.selectedShift.positionId) {
            this.shiftErrors.push('Position is required.');
        }
        if (!this.selectedShift.startTime) {
            this.shiftErrors.push('Start is required.');
        }
        if (!this.selectedShift.endTime) {
            this.shiftErrors.push('End is required.');
        }
        if (this.shiftErrors.length > 0) {
            return;
        }

        this.copyAllDays = false;

        if (this.selectedShift.shiftId) {
            this.shiftService.update(this.selectedShift).then((shift) => {
                this.selectedShift = null;
                this.getScheduleDetails();
            });
        } else {
            this.shiftService.create(this.scheduleId, this.selectedShift, copyAllDays).then((shift) => {
                this.selectedShift = null;
                this.getScheduleDetails();
            });
        }
    }

    onCopySchedule(): void {
        this.copyDayErrors = [];
        if (!this.copyFromDay) {
            this.copyDayErrors.push('Copy From Day is required.');
        }
        if (!this.copyToDay) {
            this.copyDayErrors.push('Copy To Day is required.');
        }
        if (this.copyDayErrors.length > 0) {
            return;
        }
        this.scheduleService.copyScheduleDay(this.scheduleId, this.copyFromDay, this.copyToDay)
            .then((success) => {
                this.copyFromDay = null;
                this.copyToDay = null;
                this.getScheduleDetails();
            });
    }

    onDeleteShift(shiftId: number) {
        this.shiftService.delete(shiftId).then(() => {
            this.selectedShift = null;
            this.getScheduleDetails();
        });
    }

    onShiftSelect(shift: Shift): void {
        this.selectedShift = shift;
    }

    //onScheduleSelect(scheduleId: number): void {
    //    this.router.navigate(['/schedule', scheduleId]);
    //}
}
