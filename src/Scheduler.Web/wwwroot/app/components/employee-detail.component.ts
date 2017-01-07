import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute, Params }      from '@angular/router';
import { EmployeeDetails, CancelEmployeeShift, EmployeeShiftDisplay, EmployeeConflict }       from '../models/employee-schedule';
import { ShiftService }          from '../services/shift.service';
import { EmployeeConflictService }          from '../services/employee-conflict.service';
import { EmployeeScheduleService } from '../services/employee-schedule.service';
import { AuthorizationService } from '../services/authorization.service';
import { AuthorizationDetails } from '../models/authorization';

import * as moment from 'moment'

@Component({
    moduleId: module.id,
    selector: 'my-employee-detail',
    templateUrl: 'employee-detail.component.html',
    styleUrls: ['employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

    employeeId: number;
    employeeName: string;
    employeeDetails: string;
    organizationId: number;
    organizationMessage: string;

    conflicts: EmployeeConflict[];
    selectedEmployeeConflict: EmployeeConflict;

    shifts: EmployeeShiftDisplay[];
    selectedShift: EmployeeShiftDisplay;

    canViewOrganization: boolean = true;

    conflictErrors: string[] = [];
    cancelErrors: string[] = [];

    hours: number[] = [];
    
    constructor(
        private authService: AuthorizationService,
        private employeeScheduleService: EmployeeScheduleService,
        private employeeConflictService: EmployeeConflictService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    getEmployeeConflicts(): void {
        this.authService.getAuthorization().then((authDetails) => {
            this.canViewOrganization = authDetails.permissions.indexOf('organization.details') > -1;
        });

        this.employeeConflictService.getEmployeeDetails(this.employeeId).then((details) => {
            this.organizationId = details.organizationId;
            this.organizationMessage = details.organizationMessage;
            this.conflicts = details.conflicts; 
            this.shifts = details.shifts;
            this.employeeName = details.employeeName;
            this.employeeDetails = details.employeeDetails;
        });
    }

    ngOnInit(): void {
        for (var i = 0; i < 24; i++) {
            this.hours.push(i);
        }

        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.employeeId = id;
        });

        this.getEmployeeConflicts();
    }

    onAddEmployeeConflict(): void {
        this.selectedEmployeeConflict = { employeeConflictId: 0, employeeId: this.employeeId, conflictDate: moment().toDate(), startHour: 8, endHour: 20, reason: null };
    }

    setConflictDate(conflictDate: Date) {
        this.selectedEmployeeConflict.conflictDate = conflictDate
    }

    onSaveEmployeeConflict(): void {
        this.conflictErrors = [];
        if (!this.selectedEmployeeConflict.reason) {
            this.conflictErrors.push('Reason is required.');
        }
        if (!this.selectedEmployeeConflict.conflictDate && moment.isDate(this.selectedEmployeeConflict.conflictDate)) {
            this.conflictErrors.push('Date is required.');
        }
        if (this.conflictErrors.length > 0) {
            return;
        }

        if (this.selectedEmployeeConflict.employeeConflictId) {
            this.employeeConflictService.update(this.selectedEmployeeConflict).then((conflict) => {
                this.selectedEmployeeConflict = null;
                this.getEmployeeConflicts();
            });
        } else {
            this.employeeConflictService.create(this.employeeId, this.selectedEmployeeConflict).then((conflict) => {
                this.selectedEmployeeConflict = null;
                this.getEmployeeConflicts();
            });
        }
    }

    onDeleteEmployeeConflict(employeeConflictId: number) {
        this.employeeConflictService.delete(employeeConflictId).then(() => {
            this.selectedEmployeeConflict = null;
            this.getEmployeeConflicts();
        });
    }

    onEmployeeConflictSelect(employeeConflict: EmployeeConflict): void {
        this.selectedEmployeeConflict = employeeConflict;
    }

    onCancelShift(employeeShiftId: number, reason: string) {
        this.cancelErrors = [];
        if (!reason) {
            this.cancelErrors.push('Reason is required.');
        }
        if (this.cancelErrors.length > 0) {
            return;
        }

        this.employeeScheduleService.update({ employeeShiftId: employeeShiftId, reason: reason }).then(() => {
            this.selectedShift = null;
            this.getEmployeeConflicts();
        });
    }

    onShiftSelect(shift: EmployeeShiftDisplay): void {
        this.selectedShift = shift;
    }
}
