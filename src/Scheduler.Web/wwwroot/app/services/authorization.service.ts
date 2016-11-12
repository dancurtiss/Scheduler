import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AuthorizationDetails } from '../models/authorization';

@Injectable()
export class AuthorizationService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private authorizationUrl = 'api/authorization';  // URL to web api

    constructor(private http: Http) { }

    getAuthorization(): Promise<AuthorizationDetails> {
        return this.http.get(this.authorizationUrl)
            .toPromise()
            .then((response) => {
                return response.json() as AuthorizationDetails;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
