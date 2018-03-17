import { AuthenticationService } from '../core/providers/auth/authentification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AccountDetails } from '../core/model/account-details.model';
import { AccountDetailsService } from '../core/providers/account-details/account-details.service';
import { User } from '../core/model/user';

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
  user: User = new User();
  accountDetails: AccountDetails = new AccountDetails();

  accountdetailsform: FormGroup;

  constructor(
    private accountDetailsService: AccountDetailsService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) {
    this.accountdetailsform = this.fb.group({
      'user': this.fb.group({
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

  }

  ngOnInit() {
    // TODO : Recupérer l'id du user actuel
    this.user = this.authenticationService.currentU();
    this.accountDetailsService.getByUserId(this.user.id).subscribe(accountDetails => {
      this.accountDetails = accountDetails;
      this.accountdetailsform.patchValue({
        'user': {
          'id': this.accountDetails.user.id,
          'username': this.accountDetails.user.username,
          'password': this.accountDetails.user.password,
          'email': this.accountDetails.user.email,
        },
        'id': this.accountDetails.id,
        'firstName': this.accountDetails.firstName,
        'lastName': this.accountDetails.lastName,
        'birthday': this.accountDetails.birthday,
        'avatar': this.accountDetails.avatar
      });
      this.accountdetailsform.updateValueAndValidity();
    });


  }

  /**
   * Filters all dates after today
   */
  birthdayFilter = (d: Date): boolean => {
    return d < this.today;
  }

  save = (accountDetails: AccountDetails): void => {
    accountDetails.user.role = this.accountDetails.user.role;
    this.accountDetailsService.save(accountDetails).subscribe(
      (res) => {
        this.accountdetailsform.markAsPristine();
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
