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
import { UserService } from '../user/user.service';
import { User } from '../../model/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const log = new Logger('AuthenticationService');


const routes = {
  authentication: `/api/login`,
};

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'token';
/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private currentUser = new BehaviorSubject<User>(new User());
  user: User = new User();
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private _credentials: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this._credentials = JSON.parse(sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey));
    this.user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
    if (this._credentials && this.user) {
      console.log(this.user + ' | ' + this._credentials);
      this.currentUser.next(this.user);
      this.isAuthenticated.next(true);
    }
  }

  get getUser(): User {
    return this.user;
  }
  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<boolean>} The user credentials.
   */
  login(context: LoginContext): Observable<boolean> {
    return this.http.post<boolean>(
      routes.authentication,
      JSON.stringify({ username: context.username, password: context.password }),
      { observe: 'response' })
      .map((response: HttpResponse<any>) => {
        this._credentials = response.headers.get('authorization');
        console.log(this._credentials);
        this.setCredentials(this._credentials, context.remember);
        return true;
      }, err => {
        return false;
      });
  }

  getUserAuthenticated(context: LoginContext): Observable<boolean> {
    return this.userService.getUserByUsername(context.username)
      .map((user: User) => {
        this.user = user;
        if (context.remember) {
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(this.user));
        }
        this.currentUser.next(this.user);
        this.isAuthenticated.next(true);
        return true;
      }).catch(err => {
        return of(false);
      });
  }
  currentUserConnected(): Observable<User> {
    return this.currentUser.asObservable();
  }

  currentU(): User {
    return this.currentUser.getValue();
  }
  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  authenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  handleError(text: string) {
    log.error(text);
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): boolean {
    // Customize credentials invalidation here
    this.setCredentials();
    this.isAuthenticated.next(false);
    this.currentUser.next(null);
    return true;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): string {
    return sessionStorage.getItem(credentialsKey);
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: string, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      this.user = null;
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
    }
  }

}
