import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ShiftDisplay, EmployeeDisplay, EmployeeSchedule, AddEmployeeShift, CancelEmployeeShift } from '../models/employee-schedule';

@Injectable()
export class EmployeeScheduleService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private employeesUrl = 'api/employeeschedule';  // URL to web api

    constructor(private http: Http) { }

    getEmployeeShifts(organizationId: number, date: string): Promise<EmployeeSchedule> {
        const url = `${this.employeesUrl}/${organizationId}?date=${date}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as EmployeeSchedule;
            })
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.employeesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(organizationId: number, addShift: AddEmployeeShift): Promise<AddEmployeeShift> {
        const url = `${this.employeesUrl}/${organizationId}`;
        return this.http
            .post(url, JSON.stringify(addShift), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update(cancelShift: CancelEmployeeShift): Promise<CancelEmployeeShift> {
        const url = `${this.employeesUrl}/${cancelShift.employeeShiftId}`;
        return this.http
            .put(url, JSON.stringify(cancelShift), { headers: this.headers })
            .toPromise()
            .then(() => cancelShift)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
