import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AuthorizationDetails } from '../models/authorization';
import { HandleErrorService } from '../services/handle-error.service'

@Injectable()
export class AuthorizationService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private authorizationUrl = 'api/authorization';  // URL to web api

    constructor(private http: Http, private handleErrorService: HandleErrorService) { }

    getAuthorization(): Promise<AuthorizationDetails> {
        return this.http.get(this.authorizationUrl)
            .toPromise()
            .then((response) => {
                return response.json() as AuthorizationDetails;
            })
            .catch(this.handleErrorService.handleError);
    }
}
