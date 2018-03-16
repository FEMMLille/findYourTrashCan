import { MapBounds } from './../../shared/model/map-bounds';
import { Trashcan } from './../../shared/model/trashcan';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { AuthenticationService } from '../auth/authenticate';


@Injectable()
export class TrashcanService {
  public hasSearched = false;

    constructor(public api: Api, public auth: AuthenticationService) { }

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

    addTrashcan(trashcan: Trashcan) {
        return this.api.post('trashcan/', trashcan);
    }

    setFavoriteSearch(trashcan: Trashcan) {
      return this.api.post('trashcan/favorite', trashcan);
    }

    filterTrashcan(trashcan: Trashcan) {
        return this.api.post('trashcan/filter', trashcan);
    }
    updateTrashcan(trashcan: Trashcan) {
        return this.api.put('trashcan/', trashcan);
    }
}
