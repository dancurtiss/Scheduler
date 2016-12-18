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
var organization_service_1 = require('../services/organization.service');
var organization_manager_service_1 = require('../services/organization-manager.service');
var OrganizationDetailComponent = (function () {
    function OrganizationDetailComponent(organizationService, organizationManagerService, positionService, scheduleService, router, route) {
        this.organizationService = organizationService;
        this.organizationManagerService = organizationManagerService;
        this.positionService = positionService;
        this.scheduleService = scheduleService;
        this.router = router;
        this.route = route;
    }
    OrganizationDetailComponent.prototype.getOrganization = function () {
        var _this = this;
        this.organizationService.getOrganization(this.organizationId).then(function (organization) {
            _this.selectedOrganization = organization;
        });
    };
    OrganizationDetailComponent.prototype.getOrganizationManagers = function (organizationId) {
        var _this = this;
        this.organizationManagerService.getOrganizationManagers(organizationId)
            .then(function (managers) {
            _this.organizationManagers = managers;
        });
    };
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
        this.getOrganization();
        this.getOrganizationManagers(this.organizationId);
        this.getSchedules();
        this.getPositions();
    };
    OrganizationDetailComponent.prototype.onAddOrganizationManager = function () {
        this.createOrganizationManager = { userName: null, password: null, phoneNumber: null, emailAddress: null };
    };
    OrganizationDetailComponent.prototype.onSaveOrganizationManager = function () {
        var _this = this;
        if (this.selectedOrganization.organizationId) {
            this.organizationManagerService.create(this.selectedOrganization.organizationId, this.createOrganizationManager).then(function (manager) {
                _this.createOrganizationManager = null;
                _this.getOrganizationManagers(_this.selectedOrganization.organizationId);
            });
        }
    };
    OrganizationDetailComponent.prototype.onDeleteOrganizationManager = function (username) {
        var _this = this;
        this.organizationManagerService.delete(username).then(function () {
            _this.getOrganizationManagers(_this.selectedOrganization.organizationId);
        });
    };
    OrganizationDetailComponent.prototype.onSaveOrganization = function () {
        this.organizationService.update(this.selectedOrganization).then(function (organization) {
        });
    };
    OrganizationDetailComponent.prototype.onAddSchedule = function () {
        this.selectedSchedule = { scheduleId: 0, name: null, startDate: null, endDate: null, isActive: true };
    };
    OrganizationDetailComponent.prototype.onAddPosition = function () {
        this.selectedPosition = { positionId: 0, name: null, category: null };
    };
    OrganizationDetailComponent.prototype.onEditSchedule = function (schedule) {
        this.selectedSchedule = schedule;
    };
    OrganizationDetailComponent.prototype.setScheduleStartDate = function (date) {
        this.selectedSchedule.startDate = date;
    };
    OrganizationDetailComponent.prototype.setScheduleEndDate = function (date) {
        this.selectedSchedule.endDate = date;
    };
    OrganizationDetailComponent.prototype.onSaveSchedule = function () {
        var _this = this;
        if (this.selectedSchedule.scheduleId) {
            this.scheduleService.update(this.selectedSchedule).then(function (schedule) {
                _this.selectedSchedule = null;
                _this.getSchedules();
            });
        }
        else {
            this.scheduleService.create(this.organizationId, this.selectedSchedule).then(function (schedule) {
                _this.selectedSchedule = null;
                _this.getSchedules();
            });
        }
    };
    OrganizationDetailComponent.prototype.onDeleteSchedule = function (scheduleId) {
        var _this = this;
        var sure = confirm('Are you sure you want to delete this schedule?');
        if (!sure)
            return;
        this.scheduleService.delete(scheduleId).then(function () {
            _this.selectedSchedule = null;
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
        var sure = confirm('Are you sure you want to delete this position?');
        if (!sure)
            return;
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
        __metadata('design:paramtypes', [organization_service_1.OrganizationService, organization_manager_service_1.OrganizationManagerService, position_service_1.PositionService, schedule_service_1.ScheduleService, router_1.Router, router_1.ActivatedRoute])
    ], OrganizationDetailComponent);
    return OrganizationDetailComponent;
}());
exports.OrganizationDetailComponent = OrganizationDetailComponent;
//# sourceMappingURL=organization-detail.component.js.map