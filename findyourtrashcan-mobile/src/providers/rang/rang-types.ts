import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';


@Injectable()
export class RangTypeService {

    constructor(public api: Api) { }

    getRankDetails(rankId: number): Observable<any> {
        return this.api.get('rank-type/' + rankId);
    }
}