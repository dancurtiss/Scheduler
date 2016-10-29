import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import * as moment from 'moment'


@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor(
        private router: Router) { }

    nextTenDays: Date[];

    ngOnInit(): void {
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
