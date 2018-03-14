import { Rang } from './../../shared/model/rank';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { AuthenticationService } from '../providers';
import { RangType } from '../../shared/model/rank-type';


@Injectable()
export class RangService {

    private rank: Rang;
    // Rang = new Rang(-1, this.auth._user, new RangType(-1, "NODATA", 100000), 0)

    constructor(public api: Api) {
    }

    getRankForUser(userId: number): Observable<Rang> {
        return this.api.get('rank/user/' + userId);
    }

    incrementScore(rankId: number, score: number): Observable<Rang> {
        return this.api.put('rank/user/' + rankId + '?nbPoints=' + score, null);
    }
}