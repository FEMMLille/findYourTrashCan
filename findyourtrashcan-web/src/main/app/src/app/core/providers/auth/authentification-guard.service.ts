import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentification.service';


@Injectable()
export class AuthentificationGuardService implements CanActivate {

  private authenticated: boolean;
  constructor(public auth: AuthenticationService, public router: Router) {
    this.auth.authenticated().subscribe((bool) => {
      this.authenticated = bool;
    });
  }

  canActivate(): boolean {
    return this.authenticated;
  }
}
