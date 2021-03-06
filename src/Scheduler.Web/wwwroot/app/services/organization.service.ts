﻿import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Organization } from '../models/organization';
import { HandleErrorService } from '../services/handle-error.service'

@Injectable()
export class OrganizationService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private organizationsUrl = 'api/organization';  // URL to web api

    constructor(private http: Http, private handleErrorService: HandleErrorService) { }

    getOrganizations(): Promise<Organization[]> {
        return this.http.get(this.organizationsUrl)
            .toPromise()
            .then((response) => {
                return response.json() as Organization[];
            })
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    getOrganization(id: number): Promise<Organization> {
        const url = `${this.organizationsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as Organization;
            })
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    delete(id: number): Promise<void> {
        const url = `${this.organizationsUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    create(organization: Organization): Promise<Organization> {
        return this.http
            .post(this.organizationsUrl, JSON.stringify(organization), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    update(organization: Organization): Promise<Organization> {
        const url = `${this.organizationsUrl}/${organization.organizationId}`;
        return this.http
            .put(url, JSON.stringify(organization), { headers: this.headers })
            .toPromise()
            .then(() => organization)
            .catch((err) => { this.handleErrorService.handleError(err); });
    }
}
