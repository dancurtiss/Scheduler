import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ApplicationUser } from '../models/organization';
import { CreateEmployeeAccess } from '../models/employee'

@Injectable()
export class EmployeeAccessService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private employeesAccessUrl = 'api/employeeaccess';  // URL to web api

    constructor(private http: Http) { }

    getEmployeeAccess(employeeId: number): Promise<ApplicationUser> {
        const url = `${this.employeesAccessUrl}/${employeeId}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as ApplicationUser;
            })
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.employeesAccessUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(organizationId: number, createEmployeeAccess: CreateEmployeeAccess): Promise<ApplicationUser> {
        const url = `${this.employeesAccessUrl}/${organizationId}`;
        return this.http
            .post(url, JSON.stringify(createEmployeeAccess), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
