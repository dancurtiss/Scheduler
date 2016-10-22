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

    addOrganization(name: string, contactName: string, contactPhone: string, message: string): void {
        this.organizationService.create({ organizationId: 0, name: name, contactName: contactName, contactPhone: contactPhone, message: message}).then((organization) => {
            //this.organizations = Organizations;
        });
    }

    onSelect(organization: Organization): void {
        this.selectedOrganization = organization;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedOrganization.organizationId]);
    }
}
