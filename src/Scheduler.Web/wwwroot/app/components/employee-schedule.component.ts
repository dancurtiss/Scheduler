import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute, Params }      from '@angular/router';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { EmployeeSchedule, EmployeeDisplay, EmployeeShift, ShiftDisplay }             from '../models/employee-schedule';
import { Position }             from '../models/schedule';
import { EmployeeScheduleService }      from '../services/employee-schedule.service';
import * as moment from 'moment'


/**
 * Need to figure out the UI of picking a schedule for a day... need schema here..
 */

@Component({
    moduleId: module.id,
    selector: 'my-employee-schedules',
    templateUrl: 'employee-schedule.component.html',
    styleUrls: ['employee-schedule.component.css']
})
export class EmployeeScheduleComponent implements OnInit {

    organizationId: number;

    availableEmployees: EmployeeDisplay[];

    shiftBags: any;

    availableGroupedShifts: any;
    availableShifts: ShiftDisplay[];
    employeeShifts: EmployeeShift[];
    positionCategories: string[];

    message: string;
    scheduleDate: moment.Moment;
    
    constructor(
        private employeeScheduleService: EmployeeScheduleService,
        private router: Router,
        private route: ActivatedRoute,
        private dragulaService: DragulaService
    ) { }

    getSchedule(): void {
        var dateString = this.scheduleDate.format('MMDDYYYY');

        this.employeeScheduleService.getEmployeeShifts(this.organizationId, dateString).then((model) => {
            this.availableEmployees = model.employees;
            this.availableShifts = model.shifts;
            this.employeeShifts = model.employeeShifts;
            this.positionCategories = model.positionCategories;

            this.availableGroupedShifts = {};

            this.positionCategories.forEach((pc) => {
                this.availableGroupedShifts[pc] = this.availableShifts.filter((s) => { return s.positionCategory == pc; });
            });

            this.setupShiftBags();
        });
    }

    setupShiftBags() {
        this.shiftBags = {};
        this.availableShifts.forEach((s) => {
            this.shiftBags[s.shiftId] = [];
        });

        this.employeeShifts.forEach((es) => {
            var employee = this.availableEmployees.filter((e) => { return e.employeeId == es.employeeId; })[0];
            employee['employeeShiftId'] = es.employeeShiftId;
            this.shiftBags[es.shiftId].push(employee);
        });
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.organizationId = id;
            let date = params['date'];
            this.scheduleDate = moment(date, 'MMDDYYYY');
        });

        this.dragulaSetup();
        this.getSchedule();
    }

    added(employeeId: number, shiftId: number) {
        this.employeeScheduleService.create(this.organizationId, { employeeId: employeeId, shiftId: shiftId, shiftDate: moment(this.scheduleDate, 'MMDDYYYY').toDate() }).then((employeeShiftId) => {
            var employeeShiftObject = this.getEmployeeShiftObject(employeeId, shiftId);
            employeeShiftObject.employeeShiftId = employeeShiftId;
            console.log('shift added', employeeShiftId);
        });
    }

    remove(employeeId: number, shiftId: number) {
        var employeeShiftObject = this.getEmployeeShiftObject(employeeId, shiftId);
        var index = this.shiftBags[shiftId].indexOf(employeeShiftObject);

        if (index > -1) {
            this.employeeScheduleService.delete(employeeShiftObject.employeeShiftId).then(() => {
                this.shiftBags[shiftId].splice(index, 1);
            });
        }
    }

    getEmployeeShiftObject(employeeId: number, shiftId: number) {
        var employeeShifts = this.shiftBags[shiftId].filter((es) => {
            return es.employeeId == employeeId;
        });

        if (employeeShifts.length == 0) {
            return null;
        }

        var employeeShiftObject = employeeShifts[0];

        return employeeShiftObject;
    }

    getAllEmployeeShifts(employeeId: number):ShiftDisplay[] {
        var allShifts = [];
        for (var shiftId in this.shiftBags) {
            if (this.shiftBags.hasOwnProperty(shiftId)) {
                var shiftIdValue: number = +shiftId;
                var employeeShiftObject = this.getEmployeeShiftObject(employeeId, shiftIdValue);
                if (employeeShiftObject) {
                    var shiftObject = this.availableShifts.filter((s) => { return s.shiftId == shiftIdValue });
                    allShifts.push(shiftObject[0]);
                }
            }
        }
        return allShifts;
    }

    dragulaSetup() {
        if (this.dragulaService.find('schedule-bag')) {
            return;
        }

        this.dragulaService.setOptions('schedule-bag', {
            removeOnSpill: true,
            copy: true,
            moves: this.dragMoves,
            accepts: this.dragAccepts,
            invalid: this.dragInvalid
        });

        this.dragulaService.dropModel.subscribe((value) => {
            this.onDropModel(value.slice(1));
        });
    }

    private dragMoves = (el, source, handle, sibling): boolean => {
        // only move favorite items, not the icon element
        return el.className.toLowerCase() === 'employee-item';
    }

    private dragAccepts = (el, target, source, sibling): boolean => {
        var ownContainer = el.contains(target);
        if (ownContainer) {
            return false;
        }

        var employeeId = el.getAttribute('data-employee-id');
        var shiftId = target.getAttribute('data-shift-id');

        var employee = this.availableEmployees.filter((e) => { return e.employeeId == employeeId; })[0];
        var shift = this.availableShifts.filter((s) => { return s.shiftId == shiftId; })[0];

        if (!employee || !shift) {
            return false;
        }

        // does not have position
        if (employee.positionIds.indexOf(shift.positionId) < 0) {
            this.message = "Employee cannot work shift '" + shift.positionName + "'";
            return false;
        }

        // employee already exists
        if (this.getEmployeeShiftObject(employeeId, shiftId) != null) {
            this.message = "Employee is already working this shift.";
            return false;
        }

        // employee time overlap
        var allEmployeeShifts = this.getAllEmployeeShifts(employeeId);

        var hasConflict = false;
        allEmployeeShifts.forEach((existingShift) => {
            var shiftStartWithinOtherShift = shift.shiftStartMinute >= existingShift.shiftStartMinute && shift.shiftStartMinute < existingShift.shiftEndMinute;
            var shiftEndWithinOtherShift = shift.shiftEndMinute > existingShift.shiftStartMinute && shift.shiftEndMinute <= existingShift.shiftEndMinute;

            if (shiftStartWithinOtherShift || shiftEndWithinOtherShift) {
                hasConflict = true;
                return;
            }

            var existingShiftWithin = existingShift.shiftStartMinute >= shift.shiftStartMinute && existingShift.shiftStartMinute <= shift.shiftEndMinute;

            if (existingShiftWithin) {
                hasConflict = true;
                return;
            }
        });

        if (hasConflict) {
            this.message = "Employee is already working another shift at this time.";
            return false;
        }

        return true;
    }

    private dragInvalid = (el, handle): boolean => {
        return false; // don't prevent any drags from initiating by default
    };

    private onDropModel(args) {
        let [el, target, source] = args;

        var employeeId = el.getAttribute('data-employee-id');
        var shiftId = target.getAttribute('data-shift-id');

        this.added(employeeId, shiftId);
        this.message = null;
    }

    onDeleteEmployeeShift(employeeShiftId: number) {
        this.employeeScheduleService.delete(employeeShiftId).then(() => {
            this.getSchedule();
        });
    }
}
