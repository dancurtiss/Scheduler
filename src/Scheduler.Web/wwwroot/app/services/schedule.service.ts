﻿import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Schedule } from '../models/schedule';
import { HandleErrorService } from '../services/handle-error.service'

@Injectable()
export class ScheduleService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private schedulesUrl = 'api/schedule';  // URL to web api

    constructor(private http: Http, private handleErrorService: HandleErrorService) { }

    getSchedules(organizationId: number): Promise<Schedule[]> {
        const url = `${this.schedulesUrl}/${organizationId}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as Schedule[];
            })
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    delete(id: number): Promise<void> {
        const url = `${this.schedulesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    copyScheduleDay(scheduleId: number, sourceDay: string, targetDay: string): Promise<boolean> {
        const url = `${this.schedulesUrl}/copyscheduleday/${scheduleId}`;
        return this.http
            .post(url, JSON.stringify({ sourceDay: sourceDay, targetDay: targetDay }), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    copySchedule(scheduleId: number, name: string, startDate: Date, endDate: Date): Promise<boolean> {
        const url = `${this.schedulesUrl}/copyschedule/${scheduleId}`;
        return this.http
            .post(url, JSON.stringify({ name: name, startDate: startDate, endDate: endDate }), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    create(organizationId: number, schedule: Schedule): Promise<Schedule> {
        const url = `${this.schedulesUrl}/${organizationId}`;
        return this.http
            .post(url, JSON.stringify(schedule), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch((err) => { this.handleErrorService.handleError(err); });
    }

    update(schedule: Schedule): Promise<Schedule> {
        const url = `${this.schedulesUrl}/${schedule.scheduleId}`;
        return this.http
            .put(url, JSON.stringify(schedule), { headers: this.headers })
            .toPromise()
            .then(() => schedule)
            .catch((err) => { this.handleErrorService.handleError(err); });
    }
}
