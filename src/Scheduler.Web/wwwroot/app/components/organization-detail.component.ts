import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute, Params }      from '@angular/router';
import { Position, Schedule }       from '../models/schedule';
import { PositionService }          from '../services/position.service';
import { ScheduleService }          from '../services/schedule.service';
import { Organization, CreateOrganizationManager, ApplicationUser } from '../models/organization';
import { OrganizationService } from '../services/organization.service';
import { OrganizationManagerService } from '../services/organization-manager.service';

@Component({
    moduleId: module.id,
    selector: 'my-organization-detail',
    templateUrl: 'organization-detail.component.html',
    styleUrls: ['organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {

    organizationId: number;
    selectedOrganization: Organization;
    organizationManagers: ApplicationUser[];
    createOrganizationManager: CreateOrganizationManager;

    positions: Position[];
    selectedPosition: Position;

    schedules: Schedule[];
    selectedSchedule: Schedule;
    
    constructor(
        private organizationService: OrganizationService,
        private organizationManagerService: OrganizationManagerService,
        private positionService: PositionService,
        private scheduleService: ScheduleService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    getOrganization(): void {
        this.organizationService.getOrganization(this.organizationId).then((organization) => {
            this.selectedOrganization = organization;
        });
    }

    getOrganizationManagers(organizationId: number): void {
        this.organizationManagerService.getOrganizationManagers(organizationId)
            .then((managers) => {
                this.organizationManagers = managers;
            });
    }

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

        this.getOrganization();
        this.getOrganizationManagers(this.organizationId);

        this.getSchedules();
        this.getPositions();
    }

    onAddOrganizationManager(): void {
        this.createOrganizationManager = { userName: null, password: null, phoneNumber: null, emailAddress: null };
    }

    onSaveOrganizationManager(): void {
        if (this.selectedOrganization.organizationId) {
            this.organizationManagerService.create(this.selectedOrganization.organizationId, this.createOrganizationManager).then((manager) => {
                this.createOrganizationManager = null;
                this.getOrganizationManagers(this.selectedOrganization.organizationId);
            });
        }
    }

    onDeleteOrganizationManager(username: string) {
        this.organizationManagerService.delete(username).then(() => {
            this.getOrganizationManagers(this.selectedOrganization.organizationId);
        });
    }


    onSaveOrganization(): void {
        this.organizationService.update(this.selectedOrganization).then((organization) => {
        });
    }

    onAddSchedule(): void {
        this.selectedSchedule = { scheduleId: 0, name: null, startDate: null, endDate: null, isActive: true };
    }

    onAddPosition(): void {
        this.selectedPosition = { positionId: 0, name: null, category: null };
    }

    onEditSchedule(schedule: Schedule): void {
        this.selectedSchedule = schedule;
    }

    setScheduleStartDate(date: Date) {
        this.selectedSchedule.startDate = date;
    }
    setScheduleEndDate(date: Date) {
        this.selectedSchedule.endDate = date;
    }

    onSaveSchedule(): void {
        if (this.selectedSchedule.scheduleId) {
            this.scheduleService.update(this.selectedSchedule).then((schedule) => {
                this.selectedSchedule = null;
                this.getSchedules();
            });
        } else {
            this.scheduleService.create(this.organizationId, this.selectedSchedule).then((schedule) => {
                this.selectedSchedule = null;
                this.getSchedules();
            });
        }
    }

    onDeleteSchedule(scheduleId: number) {
        var sure = confirm('Are you sure you want to delete this schedule?');
        if (!sure) return;

        this.scheduleService.delete(scheduleId).then(() => {
            this.selectedSchedule = null;
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
        var sure = confirm('Are you sure you want to delete this position?');
        if (!sure) return;

        this.positionService.delete(positionId).then(() => {
            this.selectedPosition = null;
            this.getPositions();
        });
    }

    onPositionSelect(position: Position): void {
        this.selectedPosition = position;
    }

    onScheduleSelect(schedule: Schedule): void {
        this.router.navigate(['/schedule/detail', schedule.scheduleId]);
    }
}
