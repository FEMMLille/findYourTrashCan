import { Location } from './../../shared/model/location';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class LocationService {
    constructor(public api: Api) {

    }

    getLocationByCode(code: number): Observable<Location> {
        return this.api.get('location/' + code);
    }
}