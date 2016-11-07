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
var employee_conflict_service_1 = require('../services/employee-conflict.service');
var employee_schedule_service_1 = require('../services/employee-schedule.service');
var moment = require('moment');
var EmployeeDetailComponent = (function () {
    function EmployeeDetailComponent(employeeScheduleService, employeeConflictService, router, route) {
        this.employeeScheduleService = employeeScheduleService;
        this.employeeConflictService = employeeConflictService;
        this.router = router;
        this.route = route;
        this.hours = [];
    }
    EmployeeDetailComponent.prototype.getEmployeeConflicts = function () {
        var _this = this;
        this.employeeConflictService.getEmployeeDetails(this.employeeId).then(function (details) {
            _this.conflicts = details.conflicts;
            _this.conflicts.forEach(function (c) {
                c.conflictDate = moment(c.conflictDate).format('MM/DD/YYYY');
            });
            _this.shifts = details.shifts;
        });
    };
    EmployeeDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        for (var i = 0; i < 24; i++) {
            this.hours.push(i);
        }
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.employeeId = id;
        });
        this.getEmployeeConflicts();
    };
    EmployeeDetailComponent.prototype.onAddEmployeeConflict = function () {
        this.selectedEmployeeConflict = { employeeConflictId: 0, conflictDate: moment().format('MM/DD/YYYY'), startHour: 8, endHour: 20, reason: null };
    };
    EmployeeDetailComponent.prototype.onSaveEmployeeConflict = function () {
        var _this = this;
        if (this.selectedEmployeeConflict.employeeConflictId) {
            this.employeeConflictService.update(this.selectedEmployeeConflict).then(function (conflict) {
                _this.selectedEmployeeConflict = null;
                _this.getEmployeeConflicts();
            });
        }
        else {
            this.employeeConflictService.create(this.employeeId, this.selectedEmployeeConflict).then(function (conflict) {
                _this.selectedEmployeeConflict = null;
                _this.getEmployeeConflicts();
            });
        }
    };
    EmployeeDetailComponent.prototype.onDeleteEmployeeConflict = function (employeeConflictId) {
        var _this = this;
        this.employeeConflictService.delete(employeeConflictId).then(function () {
            _this.selectedEmployeeConflict = null;
            _this.getEmployeeConflicts();
        });
    };
    EmployeeDetailComponent.prototype.onEmployeeConflictSelect = function (employeeConflict) {
        this.selectedEmployeeConflict = employeeConflict;
    };
    EmployeeDetailComponent.prototype.onCancelShift = function (employeeShiftId, reason) {
        var _this = this;
        this.employeeScheduleService.update({ employeeShiftId: employeeShiftId, reason: reason }).then(function () {
            _this.selectedShift = null;
            _this.getEmployeeConflicts();
        });
    };
    EmployeeDetailComponent.prototype.onShiftSelect = function (shift) {
        this.selectedShift = shift;
    };
    EmployeeDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-employee-detail',
            templateUrl: 'employee-detail.component.html',
            styleUrls: ['employee-detail.component.css']
        }), 
        __metadata('design:paramtypes', [employee_schedule_service_1.EmployeeScheduleService, employee_conflict_service_1.EmployeeConflictService, router_1.Router, router_1.ActivatedRoute])
    ], EmployeeDetailComponent);
    return EmployeeDetailComponent;
}());
exports.EmployeeDetailComponent = EmployeeDetailComponent;
//# sourceMappingURL=employee-detail.component.js.map