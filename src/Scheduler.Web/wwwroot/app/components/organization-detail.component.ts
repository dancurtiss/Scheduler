import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute, Params }      from '@angular/router';
import { Position, Schedule }       from '../models/schedule';
import { PositionService }          from '../services/position.service';
import { ScheduleService }          from '../services/schedule.service';

@Component({
    moduleId: module.id,
    selector: 'my-organization-detail',
    templateUrl: 'organization-detail.component.html',
    styleUrls: ['organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {

    organizationId: number;

    positions: Position[];
    selectedPosition: Position;

    schedules: Schedule[];
    addSchedule: Schedule;
    
    constructor(
        private positionService: PositionService,
        private scheduleService: ScheduleService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    getSchedules(): void {
        this.scheduleService.getSchedules(this.organizationId).then((schedules) => {
            this.schedules = schedules;
        });
    }

    getPositions(): void {
        this.positionService.getPositions(this.organizationId).then((positions) => {
            this.positions = positions;
        });
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.organizationId = id;
        });

        this.getSchedules();
        this.getPositions();
    }

    onAddSchedule(): void {
        this.addSchedule = { scheduleId: 0, name: null, shifts: [] };
    }

    onAddPosition(): void {
        this.selectedPosition = { positionId: 0, name: null, category: null };
    }

    onSaveSchedule(): void {
        this.scheduleService.create(this.organizationId, this.addSchedule).then((schedule) => {
            this.addSchedule = null;
            this.getSchedules();
        });
    }

    onSavePosition(): void {
        if (this.selectedPosition.positionId) {
            this.positionService.update(this.selectedPosition).then((position) => {
                this.selectedPosition = null;
                this.getPositions();
            });
        } else {
            this.positionService.create(this.organizationId, this.selectedPosition).then((position) => {
                this.selectedPosition = null;
                this.getPositions();
            });
        }
    }

    onDeletePosition(positionId: number) {
        this.positionService.delete(positionId).then(() => {
            this.selectedPosition = null;
            this.getPositions();
        });
    }

    onPositionSelect(position: Position): void {
        this.selectedPosition = position;
    }

    onScheduleSelect(scheduleId: number): void {
        this.router.navigate(['/schedule', scheduleId]);
    }
}
