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
var shift_service_1 = require("../services/shift.service");
var schedule_service_1 = require("../services/schedule.service");
var moment = require("moment");
var ScheduleDetailComponent = (function () {
    function ScheduleDetailComponent(scheduleService, shiftService, router, route) {
        this.scheduleService = scheduleService;
        this.shiftService = shiftService;
        this.router = router;
        this.route = route;
        this.showDay = 'all';
        this.copyDayErrors = [];
        this.shiftErrors = [];
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }
    ScheduleDetailComponent.prototype.getScheduleDetails = function () {
        var _this = this;
        this.shiftService.getShifts(this.scheduleId).then(function (scheduleDetails) {
            _this.organizationId = scheduleDetails.organizationId;
            _this.scheduleName = scheduleDetails.name;
            _this.scheduleStart = scheduleDetails.startDate;
            _this.scheduleEnd = scheduleDetails.endDate;
            _this.positions = scheduleDetails.positions;
            _this.shifts = scheduleDetails.shifts;
            _this.shifts.forEach(function (s) {
                s.startTimeDisplay = moment(s.startTime).format('LT');
                s.endTimeDisplay = moment(s.endTime).format('LT');
            });
        });
    };
    ScheduleDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.scheduleId = id;
        });
        this.getScheduleDetails();
    };
    ScheduleDetailComponent.prototype.getDayShifts = function (day) {
        if (!this.shifts)
            return [];
        return this.shifts.filter(function (s) { return s.day == day; });
    };
    ScheduleDetailComponent.prototype.positionName = function (positionId, positions) {
        return positions.filter(function (p) { return p.positionId == positionId; })[0].name;
    };
    ScheduleDetailComponent.prototype.onAddShift = function (day) {
        var startTime = new Date();
        var endTime = new Date();
        startTime.setHours(8, 0);
        endTime.setHours(16, 0);
        this.selectedShift = { shiftId: 0, day: day, startTime: startTime, endTime: endTime, positionId: 0 };
    };
    ScheduleDetailComponent.prototype.onSaveShift = function (copyAllDays) {
        var _this = this;
        this.shiftErrors = [];
        if (!this.selectedShift.day) {
            this.shiftErrors.push('Day is required.');
        }
        if (!this.selectedShift.positionId) {
            this.shiftErrors.push('Position is required.');
        }
        if (!this.selectedShift.startTime) {
            this.shiftErrors.push('Start is required.');
        }
        if (!this.selectedShift.endTime) {
            this.shiftErrors.push('End is required.');
        }
        if (this.shiftErrors.length > 0) {
            return;
        }
        this.copyAllDays = false;
        if (this.selectedShift.shiftId) {
            this.shiftService.update(this.selectedShift).then(function (shift) {
                _this.selectedShift = null;
                _this.getScheduleDetails();
            });
        }
        else {
            this.shiftService.create(this.scheduleId, this.selectedShift, copyAllDays).then(function (shift) {
                _this.selectedShift = null;
                _this.getScheduleDetails();
            });
        }
    };
    ScheduleDetailComponent.prototype.onCopySchedule = function () {
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
        this.scheduleService.copyScheduleDay(this.scheduleId, this.copyFromDay, this.copyToDay)
            .then(function (success) {
            _this.copyFromDay = null;
            _this.copyToDay = null;
            _this.getScheduleDetails();
        });
    };
    ScheduleDetailComponent.prototype.onDeleteShift = function (shiftId) {
        var _this = this;
        this.shiftService.delete(shiftId).then(function () {
            _this.selectedShift = null;
            _this.getScheduleDetails();
        });
    };
    ScheduleDetailComponent.prototype.onShiftSelect = function (shift) {
        this.selectedShift = shift;
    };
    return ScheduleDetailComponent;
}());
ScheduleDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-schedule-detail',
        templateUrl: 'schedule-detail.component.html',
        styleUrls: ['schedule-detail.component.css']
    }),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService,
        shift_service_1.ShiftService,
        router_1.Router,
        router_1.ActivatedRoute])
], ScheduleDetailComponent);
exports.ScheduleDetailComponent = ScheduleDetailComponent;
//# sourceMappingURL=schedule-detail.component.js.map