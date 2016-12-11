import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }      from '@angular/router';
import * as moment from 'moment'


@Component({
    moduleId: module.id,
    selector: 'my-organization-schedule',
    templateUrl: 'organization-schedule.component.html',
    styleUrls: ['organization-schedule.component.css']
})
export class OrganizationScheduleComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    organizationId: number;

    calendarDate: Date;

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.organizationId = id;
        });
    }

    goToEmployeeScheduling($event: any): void {
        var dateString = moment(this.calendarDate).format('MMDDYYYY');
        this.router.navigate(['employeeschedule/detail/', this.organizationId, dateString]);
    }

}
