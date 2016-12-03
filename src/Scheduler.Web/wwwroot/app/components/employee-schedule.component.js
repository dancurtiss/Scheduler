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
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var employee_schedule_service_1 = require('../services/employee-schedule.service');
var moment = require('moment');
/**
 * Need to figure out the UI of picking a schedule for a day... need schema here..
 */
var EmployeeScheduleComponent = (function () {
    function EmployeeScheduleComponent(employeeScheduleService, router, route, dragulaService) {
        var _this = this;
        this.employeeScheduleService = employeeScheduleService;
        this.router = router;
        this.route = route;
        this.dragulaService = dragulaService;
        this.dragMoves = function (el, source, handle, sibling) {
            // only move favorite items, not the icon element
            return el.className.toLowerCase() === 'employee-item';
        };
        this.dragAccepts = function (el, target, source, sibling) {
            var ownContainer = el.contains(target);
            if (ownContainer) {
                return false;
            }
            var employeeId = el.getAttribute('data-employee-id');
            var shiftId = target.getAttribute('data-shift-id');
            var employee = _this.availableEmployees.filter(function (e) { return e.employeeId == employeeId; })[0];
            var shift = _this.availableShifts.filter(function (s) { return s.shiftId == shiftId; })[0];
            if (!employee || !shift) {
                return false;
            }
            // does not have position
            if (employee.positionIds.indexOf(shift.positionId) < 0) {
                _this.message = "Employee cannot work shift '" + shift.positionName + "'";
                return false;
            }
            // employee already exists
            if (_this.getEmployeeShiftObject(employeeId, shiftId) != null) {
                _this.message = "Employee is already working this shift.";
                return false;
            }
            // employee time overlap
            var allEmployeeShifts = _this.getAllEmployeeShifts(employeeId);
            var hasConflict = false;
            allEmployeeShifts.forEach(function (existingShift) {
                var shiftStartWithinOtherShift = shift.shiftStartMinute >= existingShift.shiftStartMinute && shift.shiftStartMinute < existingShift.shiftEndMinute;
                var shiftEndWithinOtherShift = shift.shiftEndMinute > existingShift.shiftStartMinute && shift.shiftEndMinute <= existingShift.shiftEndMinute;
                if (shiftStartWithinOtherShift || shiftEndWithinOtherShift) {
                    hasConflict = true;
                    return;
                }
                var existingShiftWithin = existingShift.shiftStartMinute >= shift.shiftStartMinute && existingShift.shiftStartMinute <= shift.shiftEndMinute;
                if (existingShiftWithin) {
                    hasConflict = true;
                    return;
                }
            });
            if (hasConflict) {
                _this.message = "Employee is already working another shift at this time.";
                return false;
            }
            return true;
        };
        this.dragInvalid = function (el, handle) {
            return false; // don't prevent any drags from initiating by default
        };
    }
    EmployeeScheduleComponent.prototype.getSchedule = function () {
        var _this = this;
        var dateString = this.scheduleDate.format('MMDDYYYY');
        this.employeeScheduleService.getEmployeeShifts(this.organizationId, dateString).then(function (model) {
            _this.availableEmployees = model.employees;
            _this.availableShifts = model.shifts;
            _this.employeeShifts = model.employeeShifts;
            _this.positionCategories = model.positionCategories;
            _this.availableGroupedShifts = {};
            _this.positionCategories.forEach(function (pc) {
                _this.availableGroupedShifts[pc] = _this.availableShifts.filter(function (s) { return s.positionCategory == pc; });
            });
            _this.setupShiftBags();
        });
    };
    EmployeeScheduleComponent.prototype.setupShiftBags = function () {
        var _this = this;
        this.shiftBags = {};
        this.availableShifts.forEach(function (s) {
            _this.shiftBags[s.shiftId] = [];
        });
        this.employeeShifts.forEach(function (es) {
            var employee = _this.availableEmployees.filter(function (e) { return e.employeeId == es.employeeId; })[0];
            employee['employeeShiftId'] = es.employeeShiftId;
            _this.shiftBags[es.shiftId].push(employee);
        });
    };
    EmployeeScheduleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.organizationId = id;
            var date = params['date'];
            _this.scheduleDate = moment(date, 'MMDDYYYY');
        });
        this.dragulaSetup();
        this.getSchedule();
    };
    EmployeeScheduleComponent.prototype.added = function (employeeId, shiftId) {
        var _this = this;
        this.employeeScheduleService.create(this.organizationId, { employeeId: employeeId, shiftId: shiftId, shiftDate: moment(this.scheduleDate, 'MMDDYYYY').toDate() }).then(function (employeeShiftId) {
            var employeeShiftObject = _this.getEmployeeShiftObject(employeeId, shiftId);
            employeeShiftObject.employeeShiftId = employeeShiftId;
            console.log('shift added', employeeShiftId);
        });
    };
    EmployeeScheduleComponent.prototype.remove = function (employeeId, shiftId) {
        var _this = this;
        var employeeShiftObject = this.getEmployeeShiftObject(employeeId, shiftId);
        var index = this.shiftBags[shiftId].indexOf(employeeShiftObject);
        if (index > -1) {
            this.employeeScheduleService.delete(employeeShiftObject.employeeShiftId).then(function () {
                _this.shiftBags[shiftId].splice(index, 1);
            });
        }
    };
    EmployeeScheduleComponent.prototype.getEmployeeShiftObject = function (employeeId, shiftId) {
        var employeeShifts = this.shiftBags[shiftId].filter(function (es) {
            return es.employeeId == employeeId;
        });
        if (employeeShifts.length == 0) {
            return null;
        }
        var employeeShiftObject = employeeShifts[0];
        return employeeShiftObject;
    };
    EmployeeScheduleComponent.prototype.getAllEmployeeShifts = function (employeeId) {
        var allShifts = [];
        for (var shiftId in this.shiftBags) {
            if (this.shiftBags.hasOwnProperty(shiftId)) {
                var shiftIdValue = +shiftId;
                var employeeShiftObject = this.getEmployeeShiftObject(employeeId, shiftIdValue);
                if (employeeShiftObject) {
                    var shiftObject = this.availableShifts.filter(function (s) { return s.shiftId == shiftIdValue; });
                    allShifts.push(shiftObject[0]);
                }
            }
        }
        return allShifts;
    };
    EmployeeScheduleComponent.prototype.dragulaSetup = function () {
        var _this = this;
        if (this.dragulaService.find('schedule-bag')) {
            return;
        }
        this.dragulaService.setOptions('schedule-bag', {
            removeOnSpill: true,
            copy: true,
            moves: this.dragMoves,
            accepts: this.dragAccepts,
            invalid: this.dragInvalid
        });
        this.dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
    };
    EmployeeScheduleComponent.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
        var employeeId = el.getAttribute('data-employee-id');
        var shiftId = target.getAttribute('data-shift-id');
        this.added(employeeId, shiftId);
        this.message = null;
    };
    EmployeeScheduleComponent.prototype.onDeleteEmployeeShift = function (employeeShiftId) {
        var _this = this;
        this.employeeScheduleService.delete(employeeShiftId).then(function () {
            _this.getSchedule();
        });
    };
    EmployeeScheduleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-employee-schedules',
            templateUrl: 'employee-schedule.component.html',
            styleUrls: ['employee-schedule.component.css']
        }), 
        __metadata('design:paramtypes', [employee_schedule_service_1.EmployeeScheduleService, router_1.Router, router_1.ActivatedRoute, ng2_dragula_1.DragulaService])
    ], EmployeeScheduleComponent);
    return EmployeeScheduleComponent;
}());
exports.EmployeeScheduleComponent = EmployeeScheduleComponent;
//# sourceMappingURL=employee-schedule.component.js.map