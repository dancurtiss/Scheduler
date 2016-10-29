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
var router_1 = require('@angular/router');
var employee_service_1 = require('../services/employee.service');
/**
 * Need to figure out the UI of picking a schedule for a day... need schema here..
 */
var EmployeeScheduleComponent = (function () {
    function EmployeeScheduleComponent(employeeService, router, route) {
        this.employeeService = employeeService;
        this.router = router;
        this.route = route;
        this.showAdd = false;
    }
    EmployeeScheduleComponent.prototype.getEmployees = function () {
        //this.employeeService.getEmployees(this.organizationId).then((model) => {
        //    this.employees = model.employees;
        //    this.availablePositions = model.availablePositions;
        //});
    };
    EmployeeScheduleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.organizationId = id;
        });
        this.getEmployees();
    };
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
    EmployeeScheduleComponent.prototype.onDeleteEmployee = function (employeeId) {
        var _this = this;
        this.employeeService.delete(employeeId).then(function () {
            _this.selectedEmployee = null;
            _this.getEmployees();
        });
    };
    EmployeeScheduleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-employees',
            templateUrl: 'employees.component.html',
            styleUrls: ['employees.component.css']
        }), 
        __metadata('design:paramtypes', [employee_service_1.EmployeeService, router_1.Router, router_1.ActivatedRoute])
    ], EmployeeScheduleComponent);
    return EmployeeScheduleComponent;
}());
exports.EmployeeScheduleComponent = EmployeeScheduleComponent;
//# sourceMappingURL=employee-schedule.component.js.map