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
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.dragMoves = function (el, source, handle, sibling) {
            // only move favorite items, not the icon element
            return el.className.toLowerCase() === 'employee-item';
        };
        this.dragAccepts = function (el, target, source, sibling) {
            _this.message = "";
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
                //console.log('conflicta1?', shiftStartWithinOtherShift, shiftEndWithinOtherShift, shift, existingShift.shiftStartMinute, existingShift.shiftEndMinute);
                if (shiftStartWithinOtherShift || shiftEndWithinOtherShift) {
                    hasConflict = true;
                    return;
                }
                var existingShiftWithin = existingShift.shiftStartMinute >= shift.shiftStartMinute && existingShift.shiftStartMinute < shift.shiftEndMinute;
                //console.log('conflicta2?', existingShiftWithin, shift, existingShift.shiftStartMinute, existingShift.shiftEndMinute);
                if (existingShiftWithin) {
                    hasConflict = true;
                    return;
                }
            });
            if (hasConflict) {
                _this.message = "Employee is already working another shift at this time.";
                return false;
            }
            // employee conflict overlap
            var allEmployeeConflicts = _this.getAllEmployeeConflicts(employeeId);
            hasConflict = false;
            var reason = "";
            allEmployeeConflicts.forEach(function (existingConflict) {
                var conflictStartMinute = existingConflict.startHour * 60;
                var conflictEndMinute = existingConflict.endHour * 60;
                var shiftStartWithinConflict = shift.shiftStartMinute >= conflictStartMinute && shift.shiftStartMinute < conflictEndMinute;
                var shiftEndWithinConflict = shift.shiftEndMinute > conflictStartMinute && shift.shiftEndMinute <= conflictEndMinute;
                //console.log('conflict?', shiftStartWithinConflict, shiftEndWithinConflict, shift, conflictStartMinute, conflictEndMinute);
                if (shiftStartWithinConflict || shiftEndWithinConflict) {
                    hasConflict = true;
                    reason = existingConflict.reason;
                    return;
                }
                var existingShiftWithin = conflictStartMinute >= shift.shiftStartMinute && conflictStartMinute < shift.shiftEndMinute;
                //console.log('conflict2?', existingShiftWithin, shift, conflictStartMinute, conflictEndMinute);
                if (existingShiftWithin) {
                    hasConflict = true;
                    reason = existingConflict.reason;
                    return;
                }
            });
            if (hasConflict) {
                _this.message = "Employee has conflict at this time (" + reason + ").";
                return false;
            }
            return true;
        };
        this.dragInvalid = function (el, handle) {
            return false; // don't prevent any drags from initiating by default
        };
    }
    EmployeeScheduleComponent.prototype.showCopyDay = function () {
        this.copyToDay = this.scheduleDate.format('dddd');
    };
    EmployeeScheduleComponent.prototype.onCopyDay = function () {
        var _this = this;
        this.copyDayErrors = [];
        if (!this.copyFromDay) {
            this.copyDayErrors.push('Copy From Day is required.');
        }
        if (!this.copyToDay) {
            this.copyDayErrors.push('Copy To Day is required.');
        }
        if (this.copyDayErrors.length > 0) {
            return;
        }
        this.employeeScheduleService.copyDay(this.organizationId, this.scheduleDate.toDate(), this.copyFromDay).then(function (success) {
            _this.getSchedule();
            _this.copyToDay = null;
        });
    };
    EmployeeScheduleComponent.prototype.getSchedule = function () {
        var _this = this;
        var dateString = this.scheduleDate.format('MMDDYYYY');
        this.employeeScheduleService.getEmployeeShifts(this.organizationId, dateString).then(function (model) {
            _this.availableEmployees = model.employees;
            _this.availableShifts = model.shifts;
            _this.employeeShifts = model.employeeShifts;
            _this.employeeConflicts = model.employeeConflicts;
            _this.positionCategories = model.positionCategories;
            _this.employeeConflicts.forEach(function (ec) {
                var employee = _this.availableEmployees.filter(function (e) { return e.employeeId == ec.employeeId; });
                if (employee.length) {
                    if (!employee[0].conflicts) {
                        employee[0].conflicts = [];
                    }
                    employee[0].conflicts.push(ec);
                }
            });
            _this.availableEmployees.forEach(function (e) {
                var summary = '';
                if (e.conflicts) {
                    e.conflicts.forEach(function (ec) {
                        if (summary) {
                            summary = summary + '; ';
                        }
                        var startTime = '' + (ec.startHour % 12 == 0 ? 12 : (ec.startHour % 12)) + (ec.startHour < 12 ? 'AM' : 'PM');
                        var endTime = '' + (ec.endHour % 12 == 0 ? 12 : (ec.endHour % 12)) + (ec.endHour < 12 ? 'AM' : 'PM');
                        summary = summary + ec.reason + ': ' + startTime + '-' + endTime;
                    });
                }
                e.conflictSummary = summary;
            });
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
            var employeeFound = _this.availableEmployees.filter(function (e) { return e.employeeId == es.employeeId; })[0];
            var employee = JSON.parse(JSON.stringify(employeeFound));
            employee['employeeShiftId'] = es.employeeShiftId;
            employee['canceled'] = es.canceled;
            employee['reason'] = es.reason;
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
    EmployeeScheduleComponent.prototype.previousDay = function () {
        this.scheduleDate = this.scheduleDate.add(-1, 'days');
        this.getSchedule();
    };
    EmployeeScheduleComponent.prototype.nextDay = function () {
        this.scheduleDate = this.scheduleDate.add(1, 'days');
        this.getSchedule();
    };
    EmployeeScheduleComponent.prototype.copyWeek = function () {
        var _this = this;
        this.employeeScheduleService.copyWeek(this.organizationId, this.scheduleDate.toDate()).then(function (success) {
            _this.successMessage = 'Week was successfully copied!';
            console.log('Week Copied:', _this.scheduleDate);
        });
    };
    EmployeeScheduleComponent.prototype.added = function (employeeId, shiftId) {
        var _this = this;
        this.employeeScheduleService.create(this.organizationId, { employeeId: employeeId, shiftId: shiftId, shiftDate: moment(this.scheduleDate, 'MMDDYYYY').toDate() }).then(function (employeeShiftId) {
            var employeeShiftObject = _this.getEmployeeShiftObject(employeeId, shiftId);
            if (employeeShiftObject) {
                employeeShiftObject.employeeShiftId = employeeShiftId;
                employeeShiftObject.canceled = false;
                employeeShiftObject.reason = '';
            }
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
    EmployeeScheduleComponent.prototype.getAllEmployeeConflicts = function (employeeId) {
        return this.employeeConflicts.filter(function (ec) {
            return ec.employeeId == employeeId;
        });
    };
    EmployeeScheduleComponent.prototype.dragulaSetup = function () {
        var _this = this;
        if (this.dragulaService.find('schedule-bag')) {
            this.dragulaService.destroy('schedule-bag');
        }
        this.dragulaService.setOptions('schedule-bag', {
            removeOnSpill: true,
            copy: true,
            moves: this.dragMoves,
            accepts: this.dragAccepts,
            invalid: this.dragInvalid
        });
        this.dragulaService.dropModel.observers = [];
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