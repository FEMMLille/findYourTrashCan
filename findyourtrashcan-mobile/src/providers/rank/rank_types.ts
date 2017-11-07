import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';


@Injectable()
export class RankTypeService {

    constructor(public api: Api) { }

    getRankDetails(rankId: number): Observable<any> {
        return this.api.get('rank_types/' + rankId);
    }
}