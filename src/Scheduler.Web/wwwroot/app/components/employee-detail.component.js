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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var employee_conflict_service_1 = require("../services/employee-conflict.service");
var employee_schedule_service_1 = require("../services/employee-schedule.service");
var authorization_service_1 = require("../services/authorization.service");
var moment = require("moment");
var EmployeeDetailComponent = (function () {
    function EmployeeDetailComponent(authService, employeeScheduleService, employeeConflictService, router, route) {
        this.authService = authService;
        this.employeeScheduleService = employeeScheduleService;
        this.employeeConflictService = employeeConflictService;
        this.router = router;
        this.route = route;
        this.canViewOrganization = true;
        this.conflictErrors = [];
        this.cancelErrors = [];
        this.hours = [];
    }
    EmployeeDetailComponent.prototype.getEmployeeConflicts = function () {
        var _this = this;
        this.authService.getAuthorization().then(function (authDetails) {
            _this.canViewOrganization = authDetails.permissions.indexOf('organization.details') > -1;
        });
        this.employeeConflictService.getEmployeeDetails(this.employeeId).then(function (details) {
            _this.organizationId = details.organizationId;
            _this.organizationMessage = details.organizationMessage;
            _this.conflicts = details.conflicts;
            _this.shifts = details.shifts;
            _this.employeeName = details.employeeName;
            _this.employeeDetails = details.employeeDetails;
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
        this.selectedEmployeeConflict = { employeeConflictId: 0, employeeId: this.employeeId, conflictDate: moment().toDate(), startHour: 8, endHour: 20, reason: null };
    };
    EmployeeDetailComponent.prototype.setConflictDate = function (conflictDate) {
        this.selectedEmployeeConflict.conflictDate = conflictDate;
    };
    EmployeeDetailComponent.prototype.onSaveEmployeeConflict = function () {
        var _this = this;
        this.conflictErrors = [];
        if (!this.selectedEmployeeConflict.reason) {
            this.conflictErrors.push('Reason is required.');
        }
        if (!this.selectedEmployeeConflict.conflictDate && moment.isDate(this.selectedEmployeeConflict.conflictDate)) {
            this.conflictErrors.push('Date is required.');
        }
        if (this.conflictErrors.length > 0) {
            return;
        }
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
        this.cancelErrors = [];
        if (!reason) {
            this.cancelErrors.push('Reason is required.');
        }
        if (this.cancelErrors.length > 0) {
            return;
        }
        this.employeeScheduleService.update({ employeeShiftId: employeeShiftId, reason: reason }).then(function () {
            _this.selectedShift = null;
            _this.getEmployeeConflicts();
        });
    };
    EmployeeDetailComponent.prototype.onShiftSelect = function (shift) {
        this.selectedShift = shift;
    };
    return EmployeeDetailComponent;
}());
EmployeeDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-employee-detail',
        templateUrl: 'employee-detail.component.html',
        styleUrls: ['employee-detail.component.css']
    }),
    __metadata("design:paramtypes", [authorization_service_1.AuthorizationService,
        employee_schedule_service_1.EmployeeScheduleService,
        employee_conflict_service_1.EmployeeConflictService,
        router_1.Router,
        router_1.ActivatedRoute])
], EmployeeDetailComponent);
exports.EmployeeDetailComponent = EmployeeDetailComponent;
//# sourceMappingURL=employee-detail.component.js.map