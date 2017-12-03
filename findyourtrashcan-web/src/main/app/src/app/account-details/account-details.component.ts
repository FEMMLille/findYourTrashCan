import { Component, OnInit } from '@angular/core';
import { AccountDetails } from '../shared/model/account-details.model';
import { AccountDetailsService } from './account-details.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../shared/model/user.model';
import { AuthenticationService } from '../core/shell/header/login/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-fytc-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})

/**
 * This class represents account details component
 */
export class AccountDetailsComponent implements OnInit {
  /**
   * Today date
   */
  today: Date = new Date();

  accountDetails: AccountDetails = new AccountDetails();

  accountdetailsform: FormGroup;

  constructor(
    private accountDetailsService: AccountDetailsService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    // TODO : Recupérer l'id du user actuel
    this.accountdetailsform = this.fb.group({
      'user' : this.fb.group({
        'id': this.accountDetails.user.id,
        'username': new FormControl(this.accountDetails.user.username, [
          Validators.required,
        ]),
        'password': new FormControl(this.accountDetails.user.password, [
          Validators.required
        ]),
        'email': new FormControl(this.accountDetails.user.email, [
          Validators.required,
        ]),
      }),
      'id': this.accountDetails.id,
      'firstName': new FormControl(this.accountDetails.firstName, []
      ),
      'lastName': new FormControl(this.accountDetails.lastName, [
      ]),
      'birthday': new FormControl(this.accountDetails.birthday, [
      ]),
      'avatar': new FormControl(this.accountDetails.avatar, [
      ])
    });
    this.accountDetailsService.getByUserId(3).then(accountDetails => {
      console.log(accountDetails);
      this.accountDetails = accountDetails;
      this.accountdetailsform.updateValueAndValidity();
      // this.accountDetails.id = accountDetails.id;
      // this.accountDetails.firstName = accountDetails.firstName;
      // this.accountDetails.lastName = accountDetails.lastName;
      // this.accountDetails.avatar = accountDetails.avatar;
      // this.accountDetails.birthday = accountDetails.birthday;
      // this.accountDetails.user.id = accountDetails.user.id;
      // this.accountDetails.user.username = accountDetails.user.username;
      // this.accountDetails.user.password = accountDetails.user.password;
      // this.accountDetails.user.email = accountDetails.user.email;
    });

  }

  /**
   * Filters all dates after today
   */
  birthdayFilter = (d: Date): boolean => {
    return d < this.today;
  }

  save = (accountDetails: AccountDetails): void => {
    this.accountDetailsService.save(accountDetails).then(
      (res) => {
        this.accountDetails = res;
        this.accountdetailsform.updateValueAndValidity();
        this.snackBar.open('Profil sauvegardé', '',
          {
            duration: 2000
          }
        );
      }
    );
  }

}
