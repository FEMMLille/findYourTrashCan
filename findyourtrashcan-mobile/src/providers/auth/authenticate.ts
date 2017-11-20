import { RankType } from './../../shared/model/rank_type';
import { Rank } from './../../shared/model/rank';
import { User } from './../../shared/model/user';
import { Credentials } from './../../shared/model/credentials';
import { AccountDetails } from './../../shared/model/account-details';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';


@Injectable()
export class AuthenticationService {
    _user: User;

    constructor(public api: Api) { }

    /**
    * Send a POST request to our signup endpoint with the data
    * the user entered on the form.
    */
    authenticate(credentials: Credentials): Observable<any> {
        let seq = this.api.get('authenticate', credentials).share();

        seq.subscribe((res: any) => {
            // If the API returned a successful response, mark the user as logged in
            if (res.status == 'success') {
                this._loggedIn(res);
            }
        }, err => {/*
            Keep this code for test purposes
            this._loggedIn(new User(-1, "john.doe@fytc.com", "lulz",
                new AccountDetails(-1, "John", "Doe", "john.doe@fytc.com", "../assets/img/no_avatar.png", "2017-11-04"
                    , new Rank(-1, 1, 6000), new RankType(1, "Confirmé", 8000))));*/

        });

        return seq;
    }

    /**
    * Log the user out, which forgets the session
    */
    logout() {
        this._user = null;
    }

    /**
    * Process a login/signup response to store user data
    */
    _loggedIn(resp: User) {
        this._user = resp;
    }
}