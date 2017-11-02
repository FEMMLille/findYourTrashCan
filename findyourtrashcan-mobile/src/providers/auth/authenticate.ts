import { Credentials } from './../../shared/model/credentials';
import { AccountDetails } from './../../shared/model/account-details';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';


@Injectable()
export class AuthenticationService {
    _user: any;

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
        }, err => {
            console.error('ERROR', err);
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
    _loggedIn(resp) {
        this._user = resp.user;
    }
}