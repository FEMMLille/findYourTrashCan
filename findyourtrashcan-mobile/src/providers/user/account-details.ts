import { AccountDetails } from './../../shared/model/account-details';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';


@Injectable()
export class AccountDetailsService {
    _user: any;

    constructor(public api: Api) { }

    signup(accountInfo: AccountDetails): Observable<any> {
        let seq = this.api.post('user', accountInfo).share();
        return seq;
    }
}