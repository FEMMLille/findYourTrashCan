import { HttpHeaders } from '@angular/common/http';
import { MapBounds } from './../../shared/model/map-bounds';
import { Trashcan } from './../../shared/model/trashcan';
import { Point } from './../../shared/model/point';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { AuthenticationService } from '../auth/authenticate';


@Injectable()
export class TrashcanService {
    constructor(public api: Api, public auth: AuthenticationService) { }

    getTrashcan(id: number): Observable<any> {
        return this.api.get('trashcan/' + id);
    }

    //Get trashcan in the bounds of the map
    getTrashcans(bounds: MapBounds): Observable<any> {
        var headers = new HttpHeaders({ 'Authorization': this.api.token });
        return this.api.get('trashcan/?'
            + 'ne_lat=' + bounds.northEast.lat
            + '&ne_lon=' + bounds.northEast.lon
            + '&sw_lat=' + bounds.southWest.lat
            + '&sw_lon=' + bounds.southWest.lon);
    }

    addTrashcan(trashcan: Trashcan) {
        return this.api.post('trashcan/', trashcan);
    }
}