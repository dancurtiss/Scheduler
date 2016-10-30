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

    availableShifts: ShiftDisplay[];
    employeeShifts: EmployeeShift[];

    scheduleDate: Date = new Date();
    
    constructor(
        private employeeScheduleService: EmployeeScheduleService,
        private router: Router,
        private route: ActivatedRoute,
        private dragulaService: DragulaService
    ) { }

    getSchedule(): void {
        var dateString = moment(this.scheduleDate).format('MMDDYYYY');
        this.employeeScheduleService.getEmployeeShifts(this.organizationId, dateString).then((model) => {
            this.availableEmployees = model.employees;
            this.availableShifts = model.shifts;
            this.employeeShifts = model.employeeShifts;

            this.setupShiftBags();
        });
    }

    setupShiftBags() {
        this.shiftBags = {};
        this.availableShifts.forEach((s) => {
            this.shiftBags[s.shiftId] = [];
        });
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.organizationId = id;
        });

        this.dragulaSetup();
        this.scheduleDate = new Date();
        this.getSchedule();

    }

    added(employeeId: number, shiftId: number) {
        this.employeeScheduleService.create(this.organizationId, { employeeId: employeeId, shiftId: shiftId, shiftDate: this.scheduleDate }).then((es) => {

            //es.employeeShiftId;
            console.log('shift added');
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

        var employeeShiftObject = employeeShifts[0];
        return employeeShiftObject;
    }

    dragulaSetup() {
        this.dragulaService.setOptions('schedule-bag', {
            removeOnSpill: true,
            copy: true,
            moves: function (el, source, handle, sibling) {
                // only move favorite items, not the icon element
                return el.className.toLowerCase() === 'employee-item';
            },
            accepts: function (el, target, source, sibling) {
                return !el.contains(target); // elements can not be dropped within themselves
            },
            invalid: function (el, handle) {
                return false; // don't prevent any drags from initiating by default
            }
        });

        this.dragulaService.dropModel.subscribe((value) => {
            this.onDropModel(value.slice(1));
        });
    }

    private onDropModel(args) {
        let [el, target, source] = args;

        var employeeId = el.getAttribute('data-employee-id');
        var shiftId = target.getAttribute('data-shift-id');

        this.added(employeeId, shiftId);
    }

    //onSaveEmployee(employeeId: number, name: string, contactName: string, contactPhone: string, message: string): void {
    //    if (this.selectedEmployee.employeeId) {
    //        this.employeeService.update(this.selectedEmployee).then((employee) => {
    //            this.selectedEmployee = null;
    //            this.getEmployees();
    //        });
    //    } else {
    //        this.employeeService.create(this.organizationId, this.selectedEmployee).then((employee) => {
    //            this.selectedEmployee = null;
    //            this.getEmployees();
    //        });
    //    }
    //}

    onDeleteEmployeeShift(employeeShiftId: number) {
        this.employeeScheduleService.delete(employeeShiftId).then(() => {
            this.getSchedule();
        });
    }
}
