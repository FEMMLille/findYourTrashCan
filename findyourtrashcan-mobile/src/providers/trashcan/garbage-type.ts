import { AuthenticationService } from './../auth/authenticate';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';


@Injectable()
export class GarbageTypeService {

    constructor(public api: Api, public auth: AuthenticationService) { }

    getGarbageType(id: number): Observable<any> {
        return this.api.get('garbage-type/' + id);
    }

    get(): Observable<any> {
        return this.api.get('garbageType/');
    }
}