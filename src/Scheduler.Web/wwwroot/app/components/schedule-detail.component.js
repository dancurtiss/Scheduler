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
var shift_service_1 = require('../services/shift.service');
var ScheduleDetailComponent = (function () {
    function ScheduleDetailComponent(shiftService, router, route) {
        this.shiftService = shiftService;
        this.router = router;
        this.route = route;
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.minutes = [0, 15, 30, 45];
        this.ampm = ['AM', 'PM'];
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
    ScheduleDetailComponent.prototype.positionName = function (positionId, positions) {
        return positions.filter(function (p) { return p.positionId == positionId; })[0].name;
    };
    ScheduleDetailComponent.prototype.onAddShift = function () {
        this.selectedShift = { shiftId: 0, day: null, startHour: 8, startMinute: 0, isStartAM: true, endHour: 4, endMinute: 0, isEndAM: false, positionId: 0 };
    };
    ScheduleDetailComponent.prototype.onSaveShift = function () {
        var _this = this;
        if (this.selectedShift.shiftId) {
            this.shiftService.update(this.selectedShift).then(function (shift) {
                _this.selectedShift = null;
                _this.getScheduleDetails();
            });
        }
        else {
            this.shiftService.create(this.scheduleId, this.selectedShift).then(function (shift) {
                _this.selectedShift = null;
                _this.getScheduleDetails();
            });
        }
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
    ScheduleDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-schedule-detail',
            templateUrl: 'schedule-detail.component.html',
            styleUrls: ['schedule-detail.component.css']
        }), 
        __metadata('design:paramtypes', [shift_service_1.ShiftService, router_1.Router, router_1.ActivatedRoute])
    ], ScheduleDetailComponent);
    return ScheduleDetailComponent;
}());
exports.ScheduleDetailComponent = ScheduleDetailComponent;
//# sourceMappingURL=schedule-detail.component.js.map