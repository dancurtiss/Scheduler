import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Shift, ScheduleDetails } from '../models/schedule';

@Injectable()
export class ShiftService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private shiftsUrl = 'api/shift';  // URL to web api

    constructor(private http: Http) { }

    getShifts(scheduleId: number): Promise<ScheduleDetails> {
        const url = `${this.shiftsUrl}/${scheduleId}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as Shift[];
            })
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.shiftsUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(scheduleId: number, shift: Shift): Promise<Shift> {
        const url = `${this.shiftsUrl}/${scheduleId}`;
        return this.http
            .post(url, JSON.stringify(shift), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update(shift: Shift): Promise<Shift> {
        const url = `${this.shiftsUrl}/${shift.shiftId}`;
        return this.http
            .put(url, JSON.stringify(shift), { headers: this.headers })
            .toPromise()
            .then(() => shift)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
