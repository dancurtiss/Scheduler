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
var organization_service_1 = require('../services/organization.service');
var OrganizationsComponent = (function () {
    function OrganizationsComponent(organizationService, router) {
        this.organizationService = organizationService;
        this.router = router;
    }
    OrganizationsComponent.prototype.getOrganizations = function () {
        var _this = this;
        this.organizationService.getOrganizations().then(function (Organizations) {
            _this.organizations = Organizations;
        });
    };
    OrganizationsComponent.prototype.ngOnInit = function () {
        this.getOrganizations();
    };
    OrganizationsComponent.prototype.addOrganization = function (name, contactName, contactPhone, message) {
        this.organizationService.create({ OrganizationId: null, Name: name, ContactName: contactName, ContactPhone: contactPhone, Message: message }).then(function (organization) {
            //this.organizations = Organizations;
        });
    };
    OrganizationsComponent.prototype.onSelect = function (organization) {
        this.selectedOrganization = organization;
    };
    OrganizationsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedOrganization.OrganizationId]);
    };
    OrganizationsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-organizations',
            templateUrl: 'organizations.component.html',
            styleUrls: ['organizations.component.css']
        }), 
        __metadata('design:paramtypes', [organization_service_1.OrganizationService, router_1.Router])
    ], OrganizationsComponent);
    return OrganizationsComponent;
}());
exports.OrganizationsComponent = OrganizationsComponent;
//# sourceMappingURL=organizations.component.js.map