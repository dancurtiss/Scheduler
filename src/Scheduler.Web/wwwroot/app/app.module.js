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
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./components/dashboard.component');
var organizations_component_1 = require('./components/organizations.component');
var organization_detail_component_1 = require('./components/organization-detail.component');
var schedule_detail_component_1 = require('./components/schedule-detail.component');
var employees_component_1 = require('./components/employees.component');
var employee_schedule_component_1 = require('./components/employee-schedule.component');
var organization_service_1 = require('./services/organization.service');
var schedule_service_1 = require('./services/schedule.service');
var position_service_1 = require('./services/position.service');
var shift_service_1 = require('./services/shift.service');
var employee_service_1 = require('./services/employee.service');
var employee_schedule_service_1 = require('./services/employee-schedule.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        redirectTo: '/dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'dashboard',
                        component: dashboard_component_1.DashboardComponent
                    },
                    {
                        path: 'organizations',
                        component: organizations_component_1.OrganizationsComponent
                    },
                    {
                        path: 'organization/employees/:id',
                        component: employees_component_1.EmployeesComponent
                    },
                    {
                        path: 'organization/detail/:id',
                        component: organization_detail_component_1.OrganizationDetailComponent
                    },
                    {
                        path: 'schedule/detail/:id',
                        component: schedule_detail_component_1.ScheduleDetailComponent
                    },
                    {
                        path: 'employeeschedule/detail/:id/:date',
                        component: employee_schedule_component_1.EmployeeScheduleComponent
                    }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                organizations_component_1.OrganizationsComponent,
                organization_detail_component_1.OrganizationDetailComponent,
                schedule_detail_component_1.ScheduleDetailComponent,
                employees_component_1.EmployeesComponent,
                employee_schedule_component_1.EmployeeScheduleComponent
            ],
            providers: [
                organization_service_1.OrganizationService,
                schedule_service_1.ScheduleService,
                position_service_1.PositionService,
                shift_service_1.ShiftService,
                employee_service_1.EmployeeService,
                employee_schedule_service_1.EmployeeScheduleService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map