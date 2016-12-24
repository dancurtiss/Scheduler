import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { EmployeeDetails, EmployeeConflict } from '../models/employee-schedule';
import { HandleErrorService } from '../services/handle-error.service'

@Injectable()
export class EmployeeConflictService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private employeesConflictUrl = 'api/employeeconflict';  // URL to web api

    constructor(private http: Http, private handleErrorService: HandleErrorService) { }

    getEmployeeDetails(employeeId: number): Promise<EmployeeDetails> {
        const url = `${this.employeesConflictUrl}/${employeeId}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as EmployeeDetails;
            })
            .catch(this.handleErrorService.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.employeesConflictUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleErrorService.handleError);
    }

    create(employeeId: number, employeeConflict: EmployeeConflict): Promise<EmployeeConflict> {
        const url = `${this.employeesConflictUrl}/${employeeId}`;
        return this.http
            .post(url, JSON.stringify(employeeConflict), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleErrorService.handleError);
    }

    update(employeeConflict: EmployeeConflict): Promise<EmployeeConflict> {
        const url = `${this.employeesConflictUrl}/${employeeConflict.employeeConflictId}`;
        return this.http
            .put(url, JSON.stringify(employeeConflict), { headers: this.headers })
            .toPromise()
            .then(() => employeeConflict)
            .catch(this.handleErrorService.handleError);
    }
}
