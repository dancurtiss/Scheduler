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

    organizationId: number;
    scheduleId: number;
    scheduleName: string;
    scheduleStart: Date;
    scheduleEnd: Date;

    shifts: Shift[];
    positions: Position[];
    selectedShift: Shift;

    days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    hours: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
    minutes: number[] = [0,15,30,45];
    ampm: string[] = ['AM','PM'];
    
    constructor(
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
        });
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.scheduleId = id;
        });

        this.getScheduleDetails();
    }

    positionName(positionId: number, positions: Position[]): string {
        return positions.filter((p) => { return p.positionId == positionId; })[0].name;
    }

    onAddShift(): void {
        this.selectedShift = { shiftId: 0, day: null, startHour: 8, startMinute: 0, isStartAM: true, endHour: 4, endMinute: 0, isEndAM: false, positionId: 0 };
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
