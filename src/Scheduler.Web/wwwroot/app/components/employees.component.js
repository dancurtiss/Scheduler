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
var employee_access_service_1 = require('../services/employee-access.service');
var EmployeesComponent = (function () {
    function EmployeesComponent(employeeService, employeeAccessService, router, route) {
        this.employeeService = employeeService;
        this.employeeAccessService = employeeAccessService;
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
        var _this = this;
        this.selectedEmployee = { employeeId: 0, firstName: null, lastName: null, employeeNumber: null, phoneNumber: null, isActive: true, employeePositionIds: [] };
        this.selectedEmployeePositions = [];
        this.availablePositions.forEach(function (p) {
            _this.selectedEmployeePositions.push({ positionId: p.positionId, category: p.category, name: p.name, checked: false });
        });
        this.selectedEmployeeAccess = null;
    };
    EmployeesComponent.prototype.selectPosition = function (position) {
        position.checked = position.checked ? false : true;
    };
    EmployeesComponent.prototype.onSaveEmployee = function (employeeId, name, contactName, contactPhone, message) {
        var _this = this;
        this.selectedEmployee.employeePositionIds = this.selectedEmployeePositions.filter(function (sp) { return sp.checked; }).map(function (sp) { return sp.positionId; });
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
    EmployeesComponent.prototype.getEmployeeAccess = function () {
        var _this = this;
        this.employeeAccessService.getEmployeeAccess(this.selectedEmployee.employeeId).then(function (access) { _this.selectedEmployeeAccess = access; });
    };
    EmployeesComponent.prototype.onAddEmployeeAccess = function (password) {
        var _this = this;
        if (this.selectedEmployee.employeeId && this.selectedEmployee.phoneNumber) {
            this.employeeAccessService.create(this.organizationId, {
                employeeId: this.selectedEmployee.employeeId,
                password: password,
                phoneNumber: this.selectedEmployee.phoneNumber
            }).then(function (manager) {
                _this.getEmployeeAccess();
            });
        }
    };
    EmployeesComponent.prototype.onRemoveEmployeeAccess = function () {
        var _this = this;
        this.employeeAccessService.delete(this.selectedEmployee.phoneNumber).then(function () {
            _this.selectedEmployeeAccess = null;
        });
    };
    EmployeesComponent.prototype.onSelect = function (employee) {
        var _this = this;
        this.selectedEmployee = employee;
        this.selectedEmployeePositions = [];
        this.availablePositions.forEach(function (p) {
            var selected = _this.selectedEmployee.employeePositionIds.indexOf(p.positionId) > -1;
            _this.selectedEmployeePositions.push({ positionId: p.positionId, category: p.category, name: p.name, checked: selected });
        });
        this.getEmployeeAccess();
    };
    EmployeesComponent.prototype.goToDetail = function (id) {
        this.router.navigate(['employee/detail/', id]);
    };
    EmployeesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-employees',
            templateUrl: 'employees.component.html',
            styleUrls: ['employees.component.css']
        }), 
        __metadata('design:paramtypes', [employee_service_1.EmployeeService, employee_access_service_1.EmployeeAccessService, router_1.Router, router_1.ActivatedRoute])
    ], EmployeesComponent);
    return EmployeesComponent;
}());
exports.EmployeesComponent = EmployeesComponent;
//# sourceMappingURL=employees.component.js.map