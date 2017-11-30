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

    //Get trashcan next to my position
    getTrashcans(position: Point): Observable<any> {
        return this.api.get('trashcan/?lat=' + position.lat + '&lon=' + position.lon);
    }
}