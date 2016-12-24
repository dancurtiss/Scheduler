import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Position } from '../models/schedule';
import { HandleErrorService } from '../services/handle-error.service'

@Injectable()
export class PositionService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private positionsUrl = 'api/position';  // URL to web api

    constructor(private http: Http, private handleErrorService: HandleErrorService) { }

    getPositions(organizationId: number): Promise<Position[]> {
        const url = `${this.positionsUrl}/${organizationId}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as Position[];
            })
            .catch(this.handleErrorService.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.positionsUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleErrorService.handleError);
    }

    create(organizationId: number, position: Position): Promise<Position> {
        const url = `${this.positionsUrl}/${organizationId}`;
        return this.http
            .post(url, JSON.stringify(position), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleErrorService.handleError);
    }

    update(position: Position): Promise<Position> {
        const url = `${this.positionsUrl}/${position.positionId}`;
        return this.http
            .put(url, JSON.stringify(position), { headers: this.headers })
            .toPromise()
            .then(() => position)
            .catch(this.handleErrorService.handleError);
    }
}
