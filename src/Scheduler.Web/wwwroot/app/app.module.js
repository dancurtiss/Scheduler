"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var app_component_1 = require('./app.component');
var auth_guard_service_1 = require('./services/auth-guard.service');
var my_datepicker_component_1 = require('./components/my-datepicker.component');
var organization_schedule_component_1 = require('./components/organization-schedule.component');
var organizations_component_1 = require('./components/organizations.component');
var landing_component_1 = require('./components/landing.component');
var organization_detail_component_1 = require('./components/organization-detail.component');
var schedule_detail_component_1 = require('./components/schedule-detail.component');
var employees_component_1 = require('./components/employees.component');
var employee_schedule_component_1 = require('./components/employee-schedule.component');
var employee_detail_component_1 = require('./components/employee-detail.component');
var authorization_service_1 = require('./services/authorization.service');
var organization_service_1 = require('./services/organization.service');
var organization_manager_service_1 = require('./services/organization-manager.service');
var schedule_service_1 = require('./services/schedule.service');
var position_service_1 = require('./services/position.service');
var shift_service_1 = require('./services/shift.service');
var employee_service_1 = require('./services/employee.service');
var employee_access_service_1 = require('./services/employee-access.service');
var employee_schedule_service_1 = require('./services/employee-schedule.service');
var employee_conflict_service_1 = require('./services/employee-conflict.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                ng2_dragula_1.DragulaModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_bootstrap_1.AlertModule,
                ng2_bootstrap_1.DatepickerModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        redirectTo: '/landing',
                        pathMatch: 'full'
                    },
                    {
                        path: 'landing',
                        component: landing_component_1.LandingComponent,
                        canActivate: [auth_guard_service_1.AuthGuard]
                    },
                    {
                        path: 'organizations',
                        component: organizations_component_1.OrganizationsComponent,
                        canActivate: [auth_guard_service_1.AuthGuard],
                        data: { 'permission': 'organizations.manage' }
                    },
                    {
                        path: 'organization/employees/:id',
                        component: employees_component_1.EmployeesComponent,
                        canActivate: [auth_guard_service_1.AuthGuard]
                    },
                    {
                        path: 'organization/schedule/:id',
                        component: organization_schedule_component_1.OrganizationScheduleComponent,
                        canActivate: [auth_guard_service_1.AuthGuard]
                    },
                    {
                        path: 'organization/detail/:id',
                        component: organization_detail_component_1.OrganizationDetailComponent,
                        canActivate: [auth_guard_service_1.AuthGuard]
                    },
                    {
                        path: 'schedule/detail/:id',
                        component: schedule_detail_component_1.ScheduleDetailComponent,
                        canActivate: [auth_guard_service_1.AuthGuard]
                    },
                    {
                        path: 'employeeschedule/detail/:id/:date',
                        component: employee_schedule_component_1.EmployeeScheduleComponent,
                        canActivate: [auth_guard_service_1.AuthGuard]
                    },
                    {
                        path: 'employee/detail/:id',
                        component: employee_detail_component_1.EmployeeDetailComponent,
                        canActivate: [auth_guard_service_1.AuthGuard]
                    }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                landing_component_1.LandingComponent,
                my_datepicker_component_1.IsdDatepickerComponent,
                organization_schedule_component_1.OrganizationScheduleComponent,
                organizations_component_1.OrganizationsComponent,
                organization_detail_component_1.OrganizationDetailComponent,
                schedule_detail_component_1.ScheduleDetailComponent,
                employees_component_1.EmployeesComponent,
                employee_schedule_component_1.EmployeeScheduleComponent,
                employee_detail_component_1.EmployeeDetailComponent
            ],
            providers: [
                auth_guard_service_1.AuthGuard,
                authorization_service_1.AuthorizationService,
                ng2_dragula_1.DragulaService,
                organization_service_1.OrganizationService,
                organization_manager_service_1.OrganizationManagerService,
                schedule_service_1.ScheduleService,
                position_service_1.PositionService,
                shift_service_1.ShiftService,
                employee_service_1.EmployeeService,
                employee_access_service_1.EmployeeAccessService,
                employee_schedule_service_1.EmployeeScheduleService,
                employee_conflict_service_1.EmployeeConflictService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map