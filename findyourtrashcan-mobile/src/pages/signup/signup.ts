
import { WelcomePage } from '../pages';
import { AccountDetailsService } from './../../providers/user/account-details';
import { Credentials } from './../../shared/model/credentials';
import { AuthenticationService } from './../../providers/auth/authenticate';
import { AccountDetails } from './../../shared/model/account-details';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account = new AccountDetails();
  password: string;
  cpassword: string;

  // Our translated text strings
  private signupErrorString: string;
  private unmatchingPasswordsErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public auth: AuthenticationService,
    public accountDetails: AccountDetailsService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
    this.translateService.get('UNMATCHING_PASSWORD_ERRORS').subscribe((value) => {
      this.unmatchingPasswordsErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    if (this.password == this.cpassword) {
      this.accountDetails.signup(this.account).subscribe((resp) => {
        this.auth.authenticate(new Credentials(this.account.email, this.password)).subscribe((res) => {
          this.navCtrl.push(MainPage);
        });
      }, (err) => {
        this.showToastError(this.signupErrorString);
      });
    } else {
      this.showToastError(this.unmatchingPasswordsErrorString);
    }
  }

  cancel() {
    this.navCtrl.pop();
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
}
