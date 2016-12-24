import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ShiftDisplay, EmployeeDisplay, EmployeeSchedule, AddEmployeeShift, CancelEmployeeShift } from '../models/employee-schedule';
import { HandleErrorService } from '../services/handle-error.service'

@Injectable()
export class EmployeeScheduleService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private employeesUrl = 'api/employeeschedule';  // URL to web api

    constructor(private http: Http, private handleErrorService: HandleErrorService) { }

    getEmployeeShifts(organizationId: number, date: string): Promise<EmployeeSchedule> {
        const url = `${this.employeesUrl}/${organizationId}?date=${date}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as EmployeeSchedule;
            })
            .catch(this.handleErrorService.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.employeesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleErrorService.handleError);
    }

    create(organizationId: number, addShift: AddEmployeeShift): Promise<number> {
        const url = `${this.employeesUrl}/${organizationId}`;
        return this.http
            .post(url, JSON.stringify(addShift), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleErrorService.handleError);
    }

    update(cancelShift: CancelEmployeeShift): Promise<CancelEmployeeShift> {
        const url = `${this.employeesUrl}/${cancelShift.employeeShiftId}`;
        return this.http
            .put(url, JSON.stringify(cancelShift), { headers: this.headers })
            .toPromise()
            .then(() => cancelShift)
            .catch(this.handleErrorService.handleError);
    }
}
