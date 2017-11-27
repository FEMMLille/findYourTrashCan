import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { AccountDetails } from '../../../../../../../findyourtrashcan-mobile/src/shared/model/account-details';
import { AuthenticationService } from '../core/shell/header/login/authentication.service';
import { Api } from '../../../../../../../findyourtrashcan-mobile/src/providers/api/api';


@Injectable()
export class AccountDetailsService {
    constructor(public authentService: AuthenticationService, public api: Api) { }

    create(accountDetails: AccountDetails) {
        return this.api.post('accountdetails/', accountDetails);
    }

    getByUserId(id: number) {
        return this.api.get('accountdetails/' + id);
    }

    update(accountDetails: AccountDetails) {
      return this.api.put('accountdetails/', accountDetails);
    }
}
