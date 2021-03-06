﻿import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ShiftDisplay, EmployeeDisplay, EmployeeSchedule, EmployeeShift, AddEmployeeShift, CancelEmployeeShift, ModifyEmployeeShift, CopyWeek, CopyDay, SendSMS } from '../models/employee-schedule';
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
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    getEmployeeShift(employeeShiftId: number): Promise<EmployeeShift> {
        const url = `${this.employeesUrl}/employeeshift/${employeeShiftId}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as EmployeeShift;
            })
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    modify(modifyShift: ModifyEmployeeShift): Promise<ModifyEmployeeShift> {
        const url = `${this.employeesUrl}/modify/${modifyShift.employeeShiftId}`;
        return this.http
            .put(url, JSON.stringify(modifyShift), { headers: this.headers })
            .toPromise()
            .then(() => modifyShift)
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    delete(id: number): Promise<void> {
        const url = `${this.employeesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    sendSms(organizationId: number, scheduleDate: Date): Promise<boolean> {
        const url = `${this.employeesUrl}/sendsms/${organizationId}`;

        var sendSMS: SendSMS = { scheduleDate: scheduleDate };

        return this.http
            .post(url, JSON.stringify(sendSMS), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }


    copyDay(organizationId: number, scheduleDate: Date, copyFromDay: string): Promise<boolean> {
        const url = `${this.employeesUrl}/copyday/${organizationId}`;

        var copyDay: CopyDay = { scheduleDate: scheduleDate, fromDay: copyFromDay };

        return this.http
            .post(url, JSON.stringify(copyDay), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    copyWeek(organizationId: number, date: Date): Promise<boolean> {
        const url = `${this.employeesUrl}/copyweek/${organizationId}`;

        var copyWeek: CopyWeek = { startDate: date };

        return this.http
            .post(url, JSON.stringify(copyWeek), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    create(organizationId: number, addShift: AddEmployeeShift): Promise<number> {
        const url = `${this.employeesUrl}/${organizationId}`;
        return this.http
            .post(url, JSON.stringify(addShift), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    update(cancelShift: CancelEmployeeShift): Promise<CancelEmployeeShift> {
        const url = `${this.employeesUrl}/${cancelShift.employeeShiftId}`;
        return this.http
            .put(url, JSON.stringify(cancelShift), { headers: this.headers })
            .toPromise()
            .then(() => cancelShift)
            .catch((err) => { this.handleErrorService.handleError(err); });
    }
}
