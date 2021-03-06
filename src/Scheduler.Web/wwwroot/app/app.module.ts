﻿import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';
import { DragulaModule, DragulaService } from 'ng2-dragula/ng2-dragula';

import { AlertModule, DatepickerModule, TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Cookie } from 'ng2-cookies/ng2-cookies'

import { AppComponent }         from './app.component';

import { AuthGuard }    from './services/auth-guard.service';

import { MyErrorsComponent } from './components/my-errors.component'
import { IsdDatepickerComponent } from './components/my-datepicker.component';
import { OrganizationScheduleComponent } from './components/organization-schedule.component';
import { OrganizationsComponent }       from './components/organizations.component';
import { LandingComponent }       from './components/landing.component';
import { OrganizationDetailComponent }  from './components/organization-detail.component';
import { ScheduleDetailComponent }  from './components/schedule-detail.component';
import { EmployeesComponent }       from './components/employees.component';
import { EmployeeScheduleComponent }       from './components/employee-schedule.component';
import { EmployeeDetailComponent }       from './components/employee-detail.component';


import { HandleErrorService } from './services/handle-error.service'
import { AuthorizationService }      from './services/authorization.service';
import { OrganizationService } from './services/organization.service';
import { OrganizationManagerService } from './services/organization-manager.service';
import { ScheduleService }          from './services/schedule.service';
import { PositionService }          from './services/position.service';
import { ShiftService }             from './services/shift.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeAccessService } from './services/employee-access.service';
import { EmployeeScheduleService }             from './services/employee-schedule.service';
import { EmployeeConflictService }             from './services/employee-conflict.service';


@NgModule({
    imports: [
        DragulaModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        AlertModule,
        DatepickerModule,
        TimepickerModule,
        RouterModule.forRoot([
        {
            path: '',
            redirectTo: '/landing',
            pathMatch: 'full'
        },
        {
            path: 'landing',
            component: LandingComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'organizations',
            component: OrganizationsComponent,
            canActivate: [AuthGuard],
            data: { 'permission': 'organizations.manage' }
        },
        {
            path: 'organization/employees/:id',
            component: EmployeesComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'organization/schedule/:id',
            component: OrganizationScheduleComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'organization/detail/:id',
            component: OrganizationDetailComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'schedule/detail/:id',
            component: ScheduleDetailComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'employeeschedule/detail/:id/:date',
            component: EmployeeScheduleComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'employee/detail/:id',
            component: EmployeeDetailComponent,
            canActivate: [AuthGuard]
        }
    ])
],
    declarations: [
        AppComponent,
        LandingComponent,
        MyErrorsComponent,
        IsdDatepickerComponent,
        OrganizationScheduleComponent,
        OrganizationsComponent,
        OrganizationDetailComponent,
        ScheduleDetailComponent,
        EmployeesComponent,
        EmployeeScheduleComponent,
        EmployeeDetailComponent
    ],
    providers: [
        AuthGuard,
        HandleErrorService,
        AuthorizationService,
        DragulaService,
        OrganizationService,
        OrganizationManagerService,
        ScheduleService,
        PositionService,
        ShiftService,
        EmployeeService,
        EmployeeAccessService,
        EmployeeScheduleService,
        EmployeeConflictService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
