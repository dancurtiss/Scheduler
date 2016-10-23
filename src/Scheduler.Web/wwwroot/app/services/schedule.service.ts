import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Schedule } from '../models/schedule';

@Injectable()
export class ScheduleService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private schedulesUrl = 'api/schedule';  // URL to web api

    constructor(private http: Http) { }

    getSchedules(organizationId: number): Promise<Schedule[]> {
        const url = `${this.schedulesUrl}/${organizationId}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as Schedule[];
            })
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.schedulesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(organizationId: number, schedule: Schedule): Promise<Schedule> {
        const url = `${this.schedulesUrl}/${organizationId}`;
        return this.http
            .post(url, JSON.stringify(schedule), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update(schedule: Schedule): Promise<Schedule> {
        const url = `${this.schedulesUrl}/${schedule.scheduleId}`;
        return this.http
            .put(url, JSON.stringify(schedule), { headers: this.headers })
            .toPromise()
            .then(() => schedule)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
