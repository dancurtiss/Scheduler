import 'rxjs/add/operator/toPromise';

import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Organization } from '../models/organization';

@Injectable()
export class OrganizationService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private organizationsUrl = 'api/organization';  // URL to web api

    constructor(private http: Http) { }

    getOrganizations(): Promise<Organization[]> {
        return this.http.get(this.organizationsUrl)
            .toPromise()
            .then(response => response.json().data as Organization[])
            .catch(this.handleError);
    }

    //getHero(id: number): Promise<Hero> {
    //    return this.getOrganizations()
    //        .then(heroes => heroes.filter(hero => hero.id === id)[0]);
    //}

    //delete(id: number): Promise<void> {
    //    const url = `${this.heroesUrl}/${id}`;
    //    return this.http.delete(url, { headers: this.headers })
    //        .toPromise()
    //        .then(() => null)
    //        .catch(this.handleError);
    //}

    create(organization: Organization): Promise<Organization> {
        return this.http
            .post(this.organizationsUrl, JSON.stringify(organization), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    //update(hero: Hero): Promise<Hero> {
    //    const url = `${this.heroesUrl}/${hero.id}`;
    //    return this.http
    //        .put(url, JSON.stringify(hero), { headers: this.headers })
    //        .toPromise()
    //        .then(() => hero)
    //        .catch(this.handleError);
    //}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
