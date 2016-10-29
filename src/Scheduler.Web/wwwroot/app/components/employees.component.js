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
var EmployeesComponent = (function () {
    function EmployeesComponent(employeeService, router, route) {
        this.employeeService = employeeService;
        this.router = router;
        this.route = route;
        this.showAdd = false;
    }
    EmployeesComponent.prototype.getEmployees = function () {
        var _this = this;
        this.employeeService.getEmployees(this.organizationId).then(function (model) {
            _this.employees = model.employees;
            _this.availablePositions = model.availablePositions;
        });
    };
    EmployeesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.organizationId = id;
        });
        this.getEmployees();
    };
    EmployeesComponent.prototype.onAddEmployee = function () {
        this.selectedEmployee = { employeeId: 0, firstName: null, lastName: null, employeeNumber: null, phoneNumber: null, isActive: true, employeePositionIds: [] };
    };
    EmployeesComponent.prototype.onSaveEmployee = function (employeeId, name, contactName, contactPhone, message) {
        var _this = this;
        if (this.selectedEmployee.employeeId) {
            this.employeeService.update(this.selectedEmployee).then(function (employee) {
                _this.selectedEmployee = null;
                _this.getEmployees();
            });
        }
        else {
            this.employeeService.create(this.organizationId, this.selectedEmployee).then(function (employee) {
                _this.selectedEmployee = null;
                _this.getEmployees();
            });
        }
    };
    EmployeesComponent.prototype.onDeleteEmployee = function (employeeId) {
        var _this = this;
        this.employeeService.delete(employeeId).then(function () {
            _this.selectedEmployee = null;
            _this.getEmployees();
        });
    };
    EmployeesComponent.prototype.onSelect = function (employee) {
        this.selectedEmployee = employee;
    };
    EmployeesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-employees',
            templateUrl: 'employees.component.html',
            styleUrls: ['employees.component.css']
        }), 
        __metadata('design:paramtypes', [employee_service_1.EmployeeService, router_1.Router, router_1.ActivatedRoute])
    ], EmployeesComponent);
    return EmployeesComponent;
}());
exports.EmployeesComponent = EmployeesComponent;
//# sourceMappingURL=employees.component.js.map