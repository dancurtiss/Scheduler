import { Component, OnInit }                                from '@angular/core';
import { Router, ActivatedRoute, Params }                   from '@angular/router';
import { Shift, Schedule, ScheduleDetails, Position }       from '../models/schedule';
import { ShiftService }                                     from '../services/shift.service';

@Component({
    moduleId: module.id,
    selector: 'my-schedule-detail',
    templateUrl: 'schedule-detail.component.html',
    styleUrls: ['schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {

    scheduleId: number;
    scheduleName: string;

    shifts: Shift[];
    positions: Position[];
    selectedShift: Shift;
    
    constructor(
        private shiftService: ShiftService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    getScheduleDetails(): void {
        this.shiftService.getShifts(this.scheduleId).then((scheduleDetails) => {
            this.scheduleName = scheduleDetails.name;
            this.positions = scheduleDetails.positions;
            this.shifts = scheduleDetails.shifts;
        });
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.scheduleId = id;
        });

        this.getScheduleDetails();
    }

    onAddShift(): void {
        this.selectedShift = { shiftId: 0, startTime: null, endTime: null, positionId: 0 };
    }

    onSaveShift(): void {
        if (this.selectedShift.shiftId) {
            this.shiftService.update(this.selectedShift).then((shift) => {
                this.selectedShift = null;
                this.getScheduleDetails();
            });
        } else {
            this.shiftService.create(this.scheduleId, this.selectedShift).then((shift) => {
                this.selectedShift = null;
                this.getScheduleDetails();
            });
        }
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
