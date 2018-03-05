import { HttpClient } from '@angular/common/http';
import { User } from './../../shared/model/user';
import { Credentials } from './../../shared/model/credentials';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { HttpResponse } from '@angular/common/http/src/response';
import { UserService } from '../user/user';


@Injectable()
export class AuthenticationService {
    _user: User;

    constructor(public api: Api, public http: HttpClient, public userService: UserService) { }

    /**
    * Send a POST request to our signup endpoint with the data
    * the user entered on the form.
    */
    authenticate(credentials: Credentials): Observable<any> {
        return this.http.post(
            'api/back/login',
            credentials,
            { observe: 'response' })
            .map((response: HttpResponse<any>) => {
                this.api.token = response.headers.get('authorization');
                this.getUser(credentials.username);
                return true;
            }, err => {
                return false;
            });
    }

    getUser(username: string) {
        //this.token to avoid having a cyclical dependency
        this.userService.getByUsername(username).subscribe((res) => {
            this._user = res;
        });
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