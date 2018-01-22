import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from './../../shared/model/user';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class UserService {
    _user: any;

    constructor(public api: Api, public http: HttpClient) { }

    getByUsername(username: string) {
        var headers = new HttpHeaders({ 'Authorization': this.api.token });
        return this.http.get('/api/back/user/name/' + username, { headers: headers })
            .map((res: User) => {
                console.log(res);
                return res;
            });


        /*
        .map((response: HttpResponse<any>) => {
                this.token = response.headers.get('authorization');
                this.getUser(credentials.username);
                return true;
            }, err => {
                return false;
            });
        */
        // return this.api.get('user/name/' + username, {}, { headers: headers });
    }
}
