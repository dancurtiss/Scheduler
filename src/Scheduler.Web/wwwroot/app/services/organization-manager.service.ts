import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ApplicationUser, CreateOrganizationManager } from '../models/organization';

@Injectable()
export class OrganizationManagerService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private organizationsUrl = 'api/organizationmanager';  // URL to web api

    constructor(private http: Http) { }

    getOrganizationManagers(): Promise<ApplicationUser[]> {
        return this.http.get(this.organizationsUrl)
            .toPromise()
            .then((response) => {
                return response.json() as ApplicationUser[];
            })
            .catch(this.handleError);
    }

    delete(username: string): Promise<void> {
        const url = `${this.organizationsUrl}/${username}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(organizationManager: CreateOrganizationManager): Promise<ApplicationUser> {
        return this.http
            .post(this.organizationsUrl, JSON.stringify(organizationManager), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
