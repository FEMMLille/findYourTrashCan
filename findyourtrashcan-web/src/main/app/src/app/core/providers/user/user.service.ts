import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Logger } from '../logger/logger.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { HttpResponse } from '@angular/common/http/src/response';
import { User } from '../../model/user';

const log = new Logger('UserService');


const routes = {
  getById: (id: number) => `/api/user/${id}`,
  getByUsername: (name: string) => `/api/user/name/${name}`
};

@Injectable()
export class UserService {


  constructor(private http: HttpClient) {}

  getUserByUsername(name: string): Observable<User> {
    return this.http.get<User>(
      routes.getByUsername(name))
      .map((user: User) => {
        return user;
      });
  }

}
