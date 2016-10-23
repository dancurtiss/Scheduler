import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import { AppComponent }         from './app.component';

import { DashboardComponent }   from './components/dashboard.component';

import { OrganizationsComponent }       from './components/organizations.component';
import { OrganizationDetailComponent }  from './components/organization-detail.component';
import { ScheduleDetailComponent }  from './components/schedule-detail.component';



import { OrganizationService }      from './services/organization.service';
import { ScheduleService }          from './services/schedule.service';
import { PositionService }          from './services/position.service';
import { ShiftService }             from './services/shift.service';

@NgModule({
    imports: [
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
            path: 'organization/detail/:id',
            component: OrganizationDetailComponent
        },
        {
            path: 'schedule/detail/:id',
            component: ScheduleDetailComponent
        }
    ])
],
    declarations: [
        AppComponent,
        DashboardComponent,
        OrganizationsComponent,
        OrganizationDetailComponent,
        ScheduleDetailComponent
    ],
    providers: [
        OrganizationService,
        ScheduleService,
        PositionService,
        ShiftService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
