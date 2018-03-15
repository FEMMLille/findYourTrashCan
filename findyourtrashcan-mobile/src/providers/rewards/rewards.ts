import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { Rewards } from '../../shared/model/rewards';

@Injectable()
export class RewardsService {

    constructor(public api: Api) {
    }

    public getRewardsForRankTypeId(rankTypeId: number): Observable<any> {
        return this.api.get('rewards/rank/' + rankTypeId);
    }
}