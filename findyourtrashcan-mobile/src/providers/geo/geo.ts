import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeolocationService {

    constructor(public api: Api) { }

    getByLatAndLon(lat:number, lon:number):Observable<any>{
       return this.api.getGeolocationStreet(lat,lon);
    }
}