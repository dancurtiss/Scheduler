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
var position_service_1 = require('../services/position.service');
var schedule_service_1 = require('../services/schedule.service');
var OrganizationDetailComponent = (function () {
    function OrganizationDetailComponent(positionService, scheduleService, router, route) {
        this.positionService = positionService;
        this.scheduleService = scheduleService;
        this.router = router;
        this.route = route;
    }
    OrganizationDetailComponent.prototype.getSchedules = function () {
        var _this = this;
        this.scheduleService.getSchedules(this.organizationId).then(function (schedules) {
            _this.schedules = schedules;
        });
    };
    OrganizationDetailComponent.prototype.getPositions = function () {
        var _this = this;
        this.positionService.getPositions(this.organizationId).then(function (positions) {
            _this.positions = positions;
        });
    };
    OrganizationDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.organizationId = id;
        });
        this.getSchedules();
        this.getPositions();
    };
    OrganizationDetailComponent.prototype.onAddSchedule = function () {
        this.addSchedule = { scheduleId: 0, name: null, startDate: null, endDate: null, isActive: true };
    };
    OrganizationDetailComponent.prototype.onAddPosition = function () {
        this.selectedPosition = { positionId: 0, name: null, category: null };
    };
    OrganizationDetailComponent.prototype.onSaveSchedule = function () {
        var _this = this;
        this.scheduleService.create(this.organizationId, this.addSchedule).then(function (schedule) {
            _this.addSchedule = null;
            _this.getSchedules();
        });
    };
    OrganizationDetailComponent.prototype.onSavePosition = function () {
        var _this = this;
        if (this.selectedPosition.positionId) {
            this.positionService.update(this.selectedPosition).then(function (position) {
                _this.selectedPosition = null;
                _this.getPositions();
            });
        }
        else {
            this.positionService.create(this.organizationId, this.selectedPosition).then(function (position) {
                _this.selectedPosition = null;
                _this.getPositions();
            });
        }
    };
    OrganizationDetailComponent.prototype.onDeletePosition = function (positionId) {
        var _this = this;
        this.positionService.delete(positionId).then(function () {
            _this.selectedPosition = null;
            _this.getPositions();
        });
    };
    OrganizationDetailComponent.prototype.onPositionSelect = function (position) {
        this.selectedPosition = position;
    };
    OrganizationDetailComponent.prototype.onScheduleSelect = function (schedule) {
        this.router.navigate(['/schedule/detail', schedule.scheduleId]);
    };
    OrganizationDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-organization-detail',
            templateUrl: 'organization-detail.component.html',
            styleUrls: ['organization-detail.component.css']
        }), 
        __metadata('design:paramtypes', [position_service_1.PositionService, schedule_service_1.ScheduleService, router_1.Router, router_1.ActivatedRoute])
    ], OrganizationDetailComponent);
    return OrganizationDetailComponent;
}());
exports.OrganizationDetailComponent = OrganizationDetailComponent;
//# sourceMappingURL=organization-detail.component.js.map