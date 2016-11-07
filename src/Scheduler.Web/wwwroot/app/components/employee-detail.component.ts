import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute, Params }      from '@angular/router';
import { EmployeeDetails, CancelEmployeeShift, EmployeeShiftDisplay, EmployeeConflict }       from '../models/employee-schedule';
import { ShiftService }          from '../services/shift.service';
import { EmployeeConflictService }          from '../services/employee-conflict.service';
import { EmployeeScheduleService }          from '../services/employee-schedule.service';
import * as moment from 'moment'

@Component({
    moduleId: module.id,
    selector: 'my-employee-detail',
    templateUrl: 'employee-detail.component.html',
    styleUrls: ['employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

    employeeId: number;

    conflicts: EmployeeConflict[];
    selectedEmployeeConflict: EmployeeConflict;

    shifts: EmployeeShiftDisplay[];
    selectedShift: EmployeeShiftDisplay;

    hours: number[] = [];
    
    constructor(
        private employeeScheduleService: EmployeeScheduleService,
        private employeeConflictService: EmployeeConflictService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    getEmployeeConflicts(): void {
        this.employeeConflictService.getEmployeeDetails(this.employeeId).then((details) => {
            this.conflicts = details.conflicts;

            this.conflicts.forEach((c) => {
                c.conflictDate = moment(c.conflictDate).format('MM/DD/YYYY');
            });

            this.shifts = details.shifts;
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
        this.selectedEmployeeConflict = { employeeConflictId: 0, conflictDate: moment().format('MM/DD/YYYY'), startHour: 8, endHour: 20, reason: null };
    }

    onSaveEmployeeConflict(): void {
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
        this.employeeScheduleService.update({ employeeShiftId: employeeShiftId, reason: reason }).then(() => {
            this.selectedShift = null;
            this.getEmployeeConflicts();
        });
    }

    onShiftSelect(shift: EmployeeShiftDisplay): void {
        this.selectedShift = shift;
    }
}
