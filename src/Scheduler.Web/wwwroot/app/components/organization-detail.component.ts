import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute, Params }      from '@angular/router';
import { Position, Schedule, CopySchedule }       from '../models/schedule';
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
    selectedManager: ApplicationUser;

    positions: Position[];
    selectedPosition: Position;

    schedules: Schedule[];
    selectedSchedule: Schedule;
    copySchedule: CopySchedule;

    copyScheduleErrors: string[] = [];
    scheduleErrors: string[] = [];
    positionErrors: string[] = [];
    organizationErrors: string[] = [];
    managerErrors: string[] = [];
    
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
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.managerErrors = [];
        if (!this.createOrganizationManager.userName) {
            this.managerErrors.push('Username is required.');
        }
        if (!this.createOrganizationManager.password) {
            this.managerErrors.push('Password is required.');
        }
        if (!this.createOrganizationManager.emailAddress) {
            this.managerErrors.push('Email is required.');
        }
        if (!!this.createOrganizationManager.emailAddress && !emailRegex.test(this.createOrganizationManager.emailAddress)) {
            this.managerErrors.push('Email is invalid.');
        }
        if (!!this.createOrganizationManager.phoneNumber && !/^\d{10}$/.test(this.createOrganizationManager.phoneNumber)) {
            this.managerErrors.push('Phone is invalid (10 digits).');
        }

        if (this.managerErrors.length > 0) {
            return;
        }

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

    onResetManagerPassword(password: string): void {
        this.managerErrors = [];
        if (!password) {
            this.managerErrors.push('Password is required.');
        }
        if (this.managerErrors.length > 0) {
            return;
        }

        this.organizationManagerService.setPassword(this.selectedManager.userName, password)
            .then((done) => {
                // password updated
                this.selectedManager = null;
            });
    }

    onSaveOrganization(): void {
        this.organizationErrors = [];
        if (!this.selectedOrganization.name) {
            this.organizationErrors.push('Name is required.');
        }
        if (!!this.selectedOrganization.contactPhone && !/^\d{10}$/.test(this.selectedOrganization.contactPhone)) {
            this.organizationErrors.push('Contact Phone is invalid (10 digits).');
        }
        if (this.organizationErrors.length > 0) {
            return;
        }

        this.organizationService.update(this.selectedOrganization).then((organization) => {
        });
    }

    onAddSchedule(): void {
        this.selectedSchedule = { scheduleId: 0, name: null, startDate: null, endDate: null, isActive: true };
    }

    onAddPosition(): void {
        this.selectedPosition = { positionId: 0, name: null, category: null };
    }

    showCopySchedule(schedule: Schedule): void {
        this.copySchedule = {
            name: 'Copy of ' + schedule.name,
            sourceName: schedule.name,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            isActive: true,
            scheduleId: schedule.scheduleId
        };
    }

    onCopySchedule(): void {
        this.scheduleService.copySchedule(this.copySchedule.scheduleId, this.copySchedule.name, this.copySchedule.startDate, this.copySchedule.endDate).then((success) => {
            this.copySchedule = null;
            this.getSchedules();
        });
    }

    setCopyStartDate(date: Date) {
        this.copySchedule.startDate = date;
    }

    setCopyEndDate(date: Date) {
        this.copySchedule.endDate = date;
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
        this.scheduleErrors = [];
        if (!this.selectedSchedule.name) {
            this.scheduleErrors.push('Name is required.');
        }
        if (!this.selectedSchedule.startDate) {
            this.scheduleErrors.push('Start Date is required.');
        }
        if (!this.selectedSchedule.endDate) {
            this.scheduleErrors.push('End Date is required.');
        }
        if (this.scheduleErrors.length > 0) {
            return;
        }

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
        this.positionErrors = [];
        if (!this.selectedPosition.name) {
            this.positionErrors.push('Name is required.');
        }
        if (!this.selectedPosition.category) {
            this.positionErrors.push('Category is required.');
        }
        if (this.positionErrors.length > 0) {
            return;
        }

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
