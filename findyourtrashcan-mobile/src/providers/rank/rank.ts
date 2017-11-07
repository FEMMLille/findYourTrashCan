import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';


@Injectable()
export class RankService {

    constructor(public api: Api) { }

    getRankForUser(userId: number): Observable<any> {
        return this.api.get('rank/' + userId);
    }
}