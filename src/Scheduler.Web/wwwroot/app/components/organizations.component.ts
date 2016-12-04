﻿import { Component, OnInit }        from '@angular/core';
import { Router } from '@angular/router';
import { Organization, CreateOrganizationManager, ApplicationUser } from '../models/organization';
import { OrganizationService } from '../services/organization.service';
import { OrganizationManagerService } from '../services/organization-manager.service';

@Component({
    moduleId: module.id,
    selector: 'my-organizations',
    templateUrl: 'organizations.component.html',
    styleUrls: ['organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

    organizations: Organization[];
    selectedOrganization: Organization;

    organizationManagers: ApplicationUser[];
    createOrganizationManager: CreateOrganizationManager;
    showAdd: boolean = false;
    
    constructor(
        private organizationService: OrganizationService,
        private organizationManagerService: OrganizationManagerService,
        private router: Router) { }

    getOrganizations(): void {
        this.organizationService.getOrganizations().then((organizations) => {
            this.organizations = organizations;
        });
    }

    getOrganizationManagers(organizationId: number): void {
        this.organizationManagerService.getOrganizationManagers(organizationId)
            .then((managers) => {
                this.organizationManagers = managers;
        });
    }

    ngOnInit(): void {
        this.getOrganizations();
    }

    onAddOrganization(): void {
        this.selectedOrganization = { organizationId: 0, name: null, contactName: null, contactPhone: null, message: null};
    }

    onSaveOrganization(organizationId: number, name: string, contactName: string, contactPhone: string, message: string): void {
        if (this.selectedOrganization.organizationId) {
            this.organizationService.update(this.selectedOrganization).then((organization) => {
                this.selectedOrganization = null;
                this.getOrganizations();
            });
        } else {
            this.organizationService.create(this.selectedOrganization).then((organization) => {
                this.selectedOrganization = null;
                this.getOrganizations();
            });
        }
    }

    onDeleteOrganization(organizationId: number) {
        this.organizationService.delete(organizationId).then(() => {
            this.selectedOrganization = null;
            this.getOrganizations();
        });
    }

    onAddOrganizationManager(): void {
        this.createOrganizationManager = { userName: null, password: null, phoneNumber: null, emailAddress: null };
    }


    onSaveOrganizationManager(): void {
        if (this.selectedOrganization.organizationId) {
            this.organizationManagerService.create(this.selectedOrganization.organizationId, this.createOrganizationManager).then((manager) => {
                this.createOrganizationManager = null;
                this.getOrganizationManagers(this.selectedOrganization.organizationId);
            });
        } 
    }

    onDeleteOrganizationManager(username: string) {
        this.organizationManagerService.delete(username).then(() => {
            this.getOrganizationManagers(this.selectedOrganization.organizationId);
        });
    }

    onSelect(organization: Organization): void {
        this.selectedOrganization = organization;

        this.getOrganizationManagers(organization.organizationId);
    }

    goToDetail(id: number): void {
        this.router.navigate(['/organization/detail', id]);
    }

    goToEmployees(id: number): void {
        this.router.navigate(['/organization/employees', id]);
    }

}
