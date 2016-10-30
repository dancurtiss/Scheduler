import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute, Params }      from '@angular/router';
import { DragulaModule } from 'ng2-dragula/ng2-dragula'

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
    selectedEmployee: EmployeeDisplay;


    availableShifts: ShiftDisplay[];

    employeeShifts: EmployeeShift[];

    scheduleDate: Date = new Date();
    
    constructor(
        private employeeScheduleService: EmployeeScheduleService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    getSchedule(): void {
        var dateString = moment(this.scheduleDate).format('MMDDYYYY');
        this.employeeScheduleService.getEmployeeShifts(this.organizationId, dateString).then((model) => {
            this.availableEmployees = model.employees;
            this.availableShifts = model.shifts;
            this.employeeShifts = model.employeeShifts;
        });
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.organizationId = id;
        });

        this.scheduleDate = new Date();
        this.getSchedule();
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
