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
    nextTenDays: Date[];

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.organizationId = id;
        });

        this.nextTenDays = [];

        for (var i = 0; i < 10; i++) {
            var day = new Date();
            day.setDate(day.getDate() + i);
            this.nextTenDays.push(day);
        }
    }

    goToEmployeeScheduling(id: number, date: Date): void {
        var dateString = moment(date).format('MMDDYYYY');
        this.router.navigate(['employeeschedule/detail/', id, dateString]);
    }

}
