import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { Organization }             from '../models/organization';
import { OrganizationService }      from '../services/organization.service';

@Component({
    moduleId: module.id,
    selector: 'my-organizations',
    templateUrl: 'organizations.component.html',
    styleUrls: ['organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

    organizations: Organization[];
    selectedOrganization: Organization;
    showAdd: boolean = false;
    
    constructor(
        private organizationService: OrganizationService,
        private router: Router) { }

    getOrganizations(): void {
        this.organizationService.getOrganizations().then((organizations) => {
            this.organizations = organizations;
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

    onSelect(organization: Organization): void {
        this.selectedOrganization = organization;
    }

    goToDetail(id: number): void {
        this.router.navigate(['/organization/detail', id]);
    }
}
