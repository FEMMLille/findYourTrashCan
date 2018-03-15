import { AuthenticationService } from './../../providers/providers';
import { Credentials } from './../../shared/model/credentials';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  credentials = new Credentials();

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public auth: AuthenticationService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.auth.authenticate(this.credentials).subscribe((res) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.showToastError(this.loginErrorString);
    });
  }

  showToastError(message: string) {
    // Unable to sign up
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  cancel() {
    this.navCtrl.pop();
  }
}
