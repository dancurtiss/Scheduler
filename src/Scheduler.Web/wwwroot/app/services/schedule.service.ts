import 'rxjs/add/operator/toPromise';

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
            .catch(this.handleErrorService.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.schedulesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleErrorService.handleError);
    }

    create(organizationId: number, schedule: Schedule): Promise<Schedule> {
        const url = `${this.schedulesUrl}/${organizationId}`;
        return this.http
            .post(url, JSON.stringify(schedule), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleErrorService.handleError);
    }

    update(schedule: Schedule): Promise<Schedule> {
        const url = `${this.schedulesUrl}/${schedule.scheduleId}`;
        return this.http
            .put(url, JSON.stringify(schedule), { headers: this.headers })
            .toPromise()
            .then(() => schedule)
            .catch(this.handleErrorService.handleError);
    }
}
