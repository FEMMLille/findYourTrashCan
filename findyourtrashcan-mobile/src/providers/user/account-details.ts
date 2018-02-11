import { POSTAccountDetails, AccountDetails } from './../../shared/model/account-details';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';


@Injectable()
export class AccountDetailsService {

    constructor(public api: Api) { }

    signup(accountInfo: POSTAccountDetails): Observable<any> {
        let seq = this.api.postNoToken('accountdetails', accountInfo);
        return seq;
    }

    getAccountDetailsFromUserId(id: number): Observable<any> {

        return this.api.get('accountdetails/' + id);
    }

    save(account: AccountDetails) {
        return this.api.post('accountdetails/', account);
    }
}
