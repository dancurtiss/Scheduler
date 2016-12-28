import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ApplicationUser } from '../models/organization';
import { CreateEmployeeAccess } from '../models/employee'
import { HandleErrorService } from '../services/handle-error.service'

@Injectable()
export class EmployeeAccessService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private employeesAccessUrl = 'api/employeeaccess';  // URL to web api

    constructor(private http: Http, private handleErrorService: HandleErrorService) { }

    getEmployeeAccess(employeeId: number): Promise<ApplicationUser> {
        const url = `${this.employeesAccessUrl}/${employeeId}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as ApplicationUser;
            })
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    delete(phone: string): Promise<void> {
        const url = `${this.employeesAccessUrl}/${phone}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    setPassword(username: string, password: string): Promise<boolean> {
        const url = `${this.employeesAccessUrl}/resetpassword/${username}`;

        return this.http
            .post(url, JSON.stringify({ password: password }), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    create(organizationId: number, createEmployeeAccess: CreateEmployeeAccess): Promise<ApplicationUser> {
        const url = `${this.employeesAccessUrl}/${organizationId}`;
        return this.http
            .post(url, JSON.stringify(createEmployeeAccess), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }
}
