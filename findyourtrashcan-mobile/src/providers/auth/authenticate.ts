import { Rang } from './../../shared/model/rank';
import { RangService } from './../rang/rang';
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
    _rank: Rang;

    constructor(public api: Api, public http: HttpClient, public userService: UserService, public rankService: RangService) { }

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
                this.userService.getByUsername(credentials.username).subscribe((res) => {
                    this._user = res;
                    this.rankService.getRankForUser(this._user.id).subscribe((res) => {
                        this._rank = res;
                        return true;
                    });
                });
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

    getRank() {
        this.rankService.getRankForUser(this._user.id).subscribe((res) => {
            this._rank = res;
        });
    }

    addPointsToRank(score: number) {
        this.rankService.incrementScore(this._rank.id, score).subscribe((res) => {
            this._rank = res;
        });
        return this._rank.totalPoint + score >= this._rank.rangType.necessaryPoint ? this._rank.rangType.id + 1 : this._rank.rangType.id;
    }

    /**
     * getRank() {
        if (this.rank == undefined) {
            this.getRankForUser(this.auth._user.id).subscribe((res) => {
                this.rank = res;
                return this.rank;
            });
        } else {
            return this.rank;
        }
    }

    addPointsToRank(score: number) {
        this.incrementScore(this.getRank().id, score).subscribe((res) => {
            this.rank = res;
            return this.rank.id;
        });
    }
     */

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

    isTownStaff() {
        return this._user.username == "agent";
    }
}