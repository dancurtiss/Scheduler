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
var organization_service_1 = require("../services/organization.service");
var organization_manager_service_1 = require("../services/organization-manager.service");
var OrganizationsComponent = (function () {
    function OrganizationsComponent(organizationService, organizationManagerService, router) {
        this.organizationService = organizationService;
        this.organizationManagerService = organizationManagerService;
        this.router = router;
        this.showAdd = false;
        this.managerErrors = [];
        this.organizationErrors = [];
    }
    OrganizationsComponent.prototype.getOrganizations = function () {
        var _this = this;
        this.organizationService.getOrganizations().then(function (organizations) {
            _this.organizations = organizations;
        });
    };
    OrganizationsComponent.prototype.getOrganizationManagers = function (organizationId) {
        var _this = this;
        this.organizationManagerService.getOrganizationManagers(organizationId)
            .then(function (managers) {
            _this.organizationManagers = managers;
        });
    };
    OrganizationsComponent.prototype.ngOnInit = function () {
        this.getOrganizations();
    };
    OrganizationsComponent.prototype.onAddOrganization = function () {
        this.selectedOrganization = { organizationId: 0, name: null, contactName: null, contactPhone: null, message: null };
    };
    OrganizationsComponent.prototype.onSaveOrganization = function (organizationId, name, contactName, contactPhone, message) {
        var _this = this;
        this.organizationErrors = [];
        if (!this.selectedOrganization.name) {
            this.organizationErrors.push('Name is required.');
        }
        if (!!this.selectedOrganization.contactPhone && !/^\d{10}$/.test(this.selectedOrganization.contactPhone)) {
            this.organizationErrors.push('Contact Phone is invalid (10 digits).');
        }
        if (this.organizationErrors.length > 0) {
            return;
        }
        if (this.selectedOrganization.organizationId) {
            this.organizationService.update(this.selectedOrganization).then(function (organization) {
                _this.selectedOrganization = null;
                _this.getOrganizations();
            });
        }
        else {
            this.organizationService.create(this.selectedOrganization).then(function (organization) {
                _this.selectedOrganization = null;
                _this.getOrganizations();
            });
        }
    };
    OrganizationsComponent.prototype.onDeleteOrganization = function (organizationId) {
        var _this = this;
        this.organizationService.delete(organizationId).then(function () {
            _this.selectedOrganization = null;
            _this.getOrganizations();
        });
    };
    OrganizationsComponent.prototype.onAddOrganizationManager = function () {
        this.createOrganizationManager = { userName: null, password: null, phoneNumber: null, emailAddress: null };
    };
    OrganizationsComponent.prototype.onSaveOrganizationManager = function () {
        var _this = this;
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.managerErrors = [];
        if (!this.createOrganizationManager.userName) {
            this.managerErrors.push('Username is required.');
        }
        if (!!this.createOrganizationManager.phoneNumber && !/^\d{10}$/.test(this.createOrganizationManager.phoneNumber)) {
            this.managerErrors.push('Phone is invalid (10 digits).');
        }
        if (!this.createOrganizationManager.password) {
            this.managerErrors.push('Password is required.');
        }
        if (!this.createOrganizationManager.emailAddress) {
            this.managerErrors.push('Email is required.');
        }
        if (!!this.createOrganizationManager.emailAddress && !emailRegex.test(this.createOrganizationManager.emailAddress)) {
            this.managerErrors.push('Email is invalid.');
        }
        if (this.managerErrors.length > 0) {
            return;
        }
        if (this.selectedOrganization.organizationId) {
            this.organizationManagerService.create(this.selectedOrganization.organizationId, this.createOrganizationManager).then(function (manager) {
                _this.createOrganizationManager = null;
                _this.getOrganizationManagers(_this.selectedOrganization.organizationId);
            });
        }
    };
    OrganizationsComponent.prototype.onDeleteOrganizationManager = function (username) {
        var _this = this;
        this.organizationManagerService.delete(username).then(function () {
            _this.getOrganizationManagers(_this.selectedOrganization.organizationId);
        });
    };
    OrganizationsComponent.prototype.onSelect = function (organization) {
        this.selectedOrganization = organization;
        this.getOrganizationManagers(organization.organizationId);
    };
    OrganizationsComponent.prototype.goToDetail = function (id) {
        this.router.navigate(['/organization/detail', id]);
    };
    OrganizationsComponent.prototype.goToEmployees = function (id) {
        this.router.navigate(['/organization/employees', id]);
    };
    return OrganizationsComponent;
}());
OrganizationsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-organizations',
        templateUrl: 'organizations.component.html',
        styleUrls: ['organizations.component.css']
    }),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService,
        organization_manager_service_1.OrganizationManagerService,
        router_1.Router])
], OrganizationsComponent);
exports.OrganizationsComponent = OrganizationsComponent;
//# sourceMappingURL=organizations.component.js.map