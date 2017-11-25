// import { AccountDetails } from '../shared/model/account-details';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { AuthenticationService } from '../core/shell/header/login/authentication.service';


@Injectable()
export class AccountDetailsService {
    // _user: any;

    // constructor(public api: AuthenticationService) { }

    // signup(accountInfo: AccountDetails): Observable<any> {
    //     let seq = this.api.post('user', accountInfo);
    //     return seq;
    // }

    // getAccountDetailsFromUserId(id: number): Observable<any> {
    //     return this.api.get('accountdetails/' + id);
    // }
}
