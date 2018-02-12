import { AuthenticationService } from './../../providers/providers';
import { AccountDetailsService } from './../../providers/providers';
import { Credentials } from './../../shared/model/credentials';
import { POSTAccountDetails } from './../../shared/model/account-details';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
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
  account = new POSTAccountDetails();
  password: string;
  cpassword: string;

  // Our translated text strings
  private signupErrorString: string;
  private unmatchingPasswordsErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public auth: AuthenticationService,
    public accountDetails: AccountDetailsService) {

    this.account.user.role.id = 1;
    this.account.avatar = "";

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
    this.translateService.get('UNMATCHING_PASSWORD_ERRORS').subscribe((value) => {
      this.unmatchingPasswordsErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    if (this.account.user.password == this.cpassword) {
      this.accountDetails.signup(this.account).subscribe((resp) => {
        this.auth.authenticate(new Credentials(this.account.user.username, this.account.user.password)).subscribe((res) => {
          this.navCtrl.push(MainPage);
        });
      }, (err) => {
        this.showToastError(this.signupErrorString);
      });
    } else {
      console.log(this.account.user);
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
