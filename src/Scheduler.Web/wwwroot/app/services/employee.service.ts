import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Employee, EmployeeList } from '../models/employee';
import { HandleErrorService } from '../services/handle-error.service'

@Injectable()
export class EmployeeService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private employeesUrl = 'api/employee';  // URL to web api

    constructor(private http: Http, private handleErrorService: HandleErrorService) { }

    getEmployees(organizationId: number): Promise<EmployeeList> {
        const url = `${this.employeesUrl}/${organizationId}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as EmployeeList;
            })
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    delete(id: number): Promise<void> {
        const url = `${this.employeesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    create(organizationId: number, employee: Employee): Promise<Employee> {
        const url = `${this.employeesUrl}/${organizationId}`;
        return this.http
            .post(url, JSON.stringify(employee), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    update(employee: Employee): Promise<Employee> {
        const url = `${this.employeesUrl}/${employee.employeeId}`;
        return this.http
            .put(url, JSON.stringify(employee), { headers: this.headers })
            .toPromise()
            .then(() => employee)
            .catch((err) => { this.handleErrorService.handleError(err); });
    }
}
