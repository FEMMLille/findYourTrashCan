import { MapBounds } from './../../shared/model/map-bounds';
import { Trashcan } from './../../shared/model/trashcan';
import { Point } from './../../shared/model/point';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';


@Injectable()
export class TrashcanService {
    constructor(public api: Api) { }

    getTrashcan(id: number): Observable<any> {
        return this.api.get('trashcan/' + id);
    }

    //Get trashcan in the bounds of the map
    getTrashcans(bounds: MapBounds): Observable<any> {
        return this.api.get('trashcan/?'
            + 'ne_lat=' + bounds.northEast.lat
            + '&ne_lon=' + bounds.northEast.lon
            + '&sw_lat=' + bounds.southWest.lat
            + '&sw_lon=' + bounds.southWest.lon);
    }
}