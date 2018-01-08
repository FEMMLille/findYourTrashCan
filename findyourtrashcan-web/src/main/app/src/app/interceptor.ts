import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ngContentDef } from '@angular/core/src/view/ng_content';
import { of } from 'rxjs/observable/of';
@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header.
        let reqE = null;
        if (!req.url.includes('login') && !(req.method === 'POST' && req.url.includes('accountdetails'))) {
            const token = (sessionStorage.getItem('token') || localStorage.getItem('token'));
            const jt = token.split(' ');
            const jwt = jt[1].substring(0, jt[1].length - 1);
            reqE = req.clone({ setHeaders: { 'authorization': jwt } });
        } else {
            reqE = req.clone();
        }
        // Pass on the cloned request instead of the original request.
        return next.handle(reqE).catch((error, caught) => {
            if (error.status === 401) {
                this.router.navigate(['/home']); /** if user was not authorized we redirect to home page*/
            }
            return of(error);
        }) as any;
    }
}
