import { Component, OnInit } from '@angular/core';
import { AccountDetails } from '../shared/model/account-details';
import { AccountDetailsService } from './account-details.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../shared/model/user';
import { AuthenticationService } from '../core/shell/header/login/authentication.service';

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
    private fb: FormBuilder) { }

  ngOnInit() {
    // TODO : Recupérer l'id du user actuel
    this.accountdetailsform = this.fb.group({
      'username': new FormControl(this.accountDetails.user.username, [
        Validators.required,
      ]),
      'password': new FormControl(this.accountDetails.user.password, [
        Validators.required
      ]),
      'email': new FormControl(this.accountDetails.user.email, [
        Validators.required,
      ]),
      'firstName': new FormControl(this.accountDetails.firstName, []
      ),
      'lastName': new FormControl(this.accountDetails.lastName, [
      ]),
      'birthday': new FormControl(this.accountDetails.birthday, [
      ]),
      'avatar': new FormControl(this.accountDetails.avatar, [
      ])
    });
    this.accountDetailsService.getByUserId(2);
  }

  /**
   * Filters all dates after today
   */
  birthdayFilter = (d: Date): boolean => {
    return d < this.today;
  }

  save = (): void => {
    this.accountDetailsService.save(this.accountDetails);
  }

}
