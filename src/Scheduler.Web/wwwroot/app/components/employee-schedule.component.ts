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

    remove(employeeId: number, shiftId: number) {
        var removes = this.shiftBags[shiftId].filter((es) => {
            return es.employeeId == employeeId;
        });

        var index = this.shiftBags[shiftId].indexOf(removes[0]);

        if (index > -1) {
            this.shiftBags[shiftId].splice(index, 1);
        }
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
            console.log('ouch', value);
            this.onDropModel(value.slice(1));
        });
        this.dragulaService.removeModel.subscribe((value) => {
            this.onRemoveModel(value.slice(1));
        });
        this.dragulaService.drag.subscribe((value) => {
            this.onDrag(value.slice(1));
        });
        //this.dragulaService.drop.subscribe((value) => {
        //    this.onDrop(value.slice(1));
        //});
        this.dragulaService.over.subscribe((value) => {
            this.onOver(value.slice(1));
        });
        this.dragulaService.out.subscribe((value) => {
            this.onOut(value.slice(1));
        });
    }

    private onDropModel(args) {
        let [el, target, source] = args;
        console.log(`dropmodel: ${args}`);
    }

    private onRemoveModel(args) {
        let [el, source] = args;
        console.log(`removemodel: ${args}`);
    }

    private onDrag(args) {
        let [e, el] = args;
        //console.log(`drag: ${args}`);
    }

    private onDrop(args) {
        let [e, el] = args;
        //console.log(`drop: ${args}`);
    }

    private onOver(args) {
        let [e, el, container] = args;
        //console.log(`over: ${args}`);
    }

    private onOut(args) {
        let [e, el, container] = args;
        //console.log(`out: ${args}`);
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
