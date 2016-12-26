import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ApplicationUser, CreateOrganizationManager } from '../models/organization';
import { HandleErrorService } from '../services/handle-error.service'

@Injectable()
export class OrganizationManagerService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private organizationsUrl = 'api/organizationmanager';  // URL to web api

    constructor(private http: Http, private handleErrorService: HandleErrorService) { }

    getOrganizationManagers(organizationId: number): Promise<ApplicationUser[]> {
        const url = `${this.organizationsUrl}/${organizationId}`;

        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as ApplicationUser[];
            })
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    delete(username: string): Promise<void> {
        const url = `${this.organizationsUrl}/${username}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    create(organizationId: number, organizationManager: CreateOrganizationManager): Promise<ApplicationUser> {
        const url = `${this.organizationsUrl}/${organizationId}`;

        return this.http
            .post(url, JSON.stringify(organizationManager), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }
}
