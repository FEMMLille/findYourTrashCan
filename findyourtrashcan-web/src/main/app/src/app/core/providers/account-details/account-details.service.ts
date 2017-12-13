import { Http, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../auth/authentification.service';
import { AccountDetails } from '../../model/account-details.model';
import { Observable } from 'rxjs/Observable';

const routes = {
  accountdetails: '/api/accountdetails/',
};

@Injectable()
export class AccountDetailsService {
    constructor(public authentService: AuthenticationService, private api: HttpClient) { }

    save(accountDetails: AccountDetails): Observable<AccountDetails> {
        return this.api.post<AccountDetails>(routes.accountdetails, accountDetails);
    }

    update(accountDetails: AccountDetails): Observable<AccountDetails> {
      return this.api.put<AccountDetails>(routes.accountdetails, accountDetails);
    }

    getByUserId(id: number): Observable<AccountDetails> {
        return this.api.get<AccountDetails>(routes.accountdetails + id);
    }

    /**
     * Convert a returned JSON object to Fytcuser.
     */
    private convertItemFromServer(json: any): AccountDetails {
      const entity: AccountDetails = Object.assign(new AccountDetails(), json);
      return entity;
  }

}
