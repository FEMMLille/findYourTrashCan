import {HttpEvent, HttpRequest,  HttpInterceptor, HttpHandler} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptionsArgs, Response } from '@angular/http';
import { AuthenticationService } from '../shell/header/login/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authentService: AuthenticationService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          request = request.clone({
            setHeaders: {
              'Authorization': this.authentService.credentials.token
            }
          });
          return next.handle(request);
        }

}
