import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { AccountDetails } from '../shared/model/account-details';
import { AuthenticationService } from '../core/shell/header/login/authentication.service';
import { Api } from '../providers/api/api';


@Injectable()
export class AccountDetailsService {
    constructor(public authentService: AuthenticationService, public api: Api) { }

    save(accountDetails: AccountDetails) {
        return this.api.post('accountdetails/', accountDetails);
    }

    getByUserId(id: number) {
        return this.api.get('accountdetails/' + id);
    }

}
