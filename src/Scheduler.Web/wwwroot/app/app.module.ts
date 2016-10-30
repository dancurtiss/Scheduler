import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';
import { DragulaModule, DragulaService } from 'ng2-dragula/ng2-dragula';

import { AppComponent }         from './app.component';

import { DashboardComponent }   from './components/dashboard.component';

import { OrganizationsComponent }       from './components/organizations.component';
import { OrganizationDetailComponent }  from './components/organization-detail.component';
import { ScheduleDetailComponent }  from './components/schedule-detail.component';
import { EmployeesComponent }       from './components/employees.component';
import { EmployeeScheduleComponent }       from './components/employee-schedule.component';


import { OrganizationService }      from './services/organization.service';
import { ScheduleService }          from './services/schedule.service';
import { PositionService }          from './services/position.service';
import { ShiftService }             from './services/shift.service';
import { EmployeeService }             from './services/employee.service';
import { EmployeeScheduleService }             from './services/employee-schedule.service';

@NgModule({
    imports: [
        DragulaModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
        {
            path: '',
            redirectTo: '/dashboard',
            pathMatch: 'full'
        },
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'organizations',
            component: OrganizationsComponent
        },
        {
            path: 'organization/employees/:id',
            component: EmployeesComponent
        },
        {
            path: 'organization/detail/:id',
            component: OrganizationDetailComponent
        },
        {
            path: 'schedule/detail/:id',
            component: ScheduleDetailComponent
        },
        {
            path: 'employeeschedule/detail/:id/:date',
            component: EmployeeScheduleComponent
        }
    ])
],
    declarations: [
        AppComponent,
        DashboardComponent,
        OrganizationsComponent,
        OrganizationDetailComponent,
        ScheduleDetailComponent,
        EmployeesComponent,
        EmployeeScheduleComponent
    ],
    providers: [
        DragulaService,
        OrganizationService,
        ScheduleService,
        PositionService,
        ShiftService,
        EmployeeService,
        EmployeeScheduleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
