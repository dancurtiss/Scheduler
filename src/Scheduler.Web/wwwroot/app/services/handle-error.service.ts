import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HandleErrorService {
    // Observable navItem source
    private _applicationError = new BehaviorSubject<string>('');
    // Observable navItem stream
    applicationError$ = this._applicationError.asObservable();

    constructor() { }

    handleError(error: any): Promise<any> {
        console.error('An error occurred', error);

        var errorbody = error._body ? JSON.parse(error._body) : error;
        var errorString = errorbody.message || error;

        this._applicationError.next(errorString)
        return Promise.reject(errorString);
    }
}
