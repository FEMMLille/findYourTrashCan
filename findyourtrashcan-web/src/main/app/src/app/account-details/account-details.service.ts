import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { AccountDetails } from '../shared/model/account-details';
import { AuthenticationService } from '../core/shell/header/login/authentication.service';
import { Api } from '../providers/api/api';

const routes = {
  accountdetails: '/back/accountdetails/',
};

@Injectable()
export class AccountDetailsService {
    constructor(public authentService: AuthenticationService, private api: Http) { }

    save(accountDetails: AccountDetails) {
        return this.api.post(routes.accountdetails, accountDetails);
    }

    getByUserId(id: number) {
        return this.api.get(routes.accountdetails + id).subscribe(accountDetails => {
          console.log(accountDetails);
      });
    }

    /**
     * Convert a returned JSON object to Fytcuser.
     */
    private convertItemFromServer(json: any): AccountDetails {
      const entity: AccountDetails = Object.assign(new AccountDetails(), json);
      return entity;
  }

}
