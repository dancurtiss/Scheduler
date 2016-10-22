import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Organization } from '../models/organization';

@Injectable()
export class OrganizationService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private organizationsUrl = 'api/organization';  // URL to web api

    constructor(private http: Http) { }

    getOrganizations(): Promise<Organization[]> {
        return this.http.get(this.organizationsUrl)
            .toPromise()
            .then((response) => {
                return response.json() as Organization[];
            })
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.organizationsUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(organization: Organization): Promise<Organization> {
        return this.http
            .post(this.organizationsUrl, JSON.stringify(organization), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update(organization: Organization): Promise<Organization> {
        const url = `${this.organizationsUrl}/${organization.organizationId}`;
        return this.http
            .put(url, JSON.stringify(organization), { headers: this.headers })
            .toPromise()
            .then(() => organization)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
