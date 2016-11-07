import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { EmployeeDetails, EmployeeConflict } from '../models/employee-schedule';

@Injectable()
export class EmployeeConflictService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private employeesConflictUrl = 'api/employeeconflict';  // URL to web api

    constructor(private http: Http) { }

    getEmployeeDetails(employeeId: number): Promise<EmployeeDetails> {
        const url = `${this.employeesConflictUrl}/${employeeId}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as EmployeeDetails;
            })
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.employeesConflictUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(employeeId: number, employeeConflict: EmployeeConflict): Promise<EmployeeConflict> {
        const url = `${this.employeesConflictUrl}/${employeeId}`;
        return this.http
            .post(url, JSON.stringify(employeeConflict), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update(employeeConflict: EmployeeConflict): Promise<EmployeeConflict> {
        const url = `${this.employeesConflictUrl}/${employeeConflict.employeeConflictId}`;
        return this.http
            .put(url, JSON.stringify(employeeConflict), { headers: this.headers })
            .toPromise()
            .then(() => employeeConflict)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
