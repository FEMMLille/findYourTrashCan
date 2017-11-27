import { Component, OnInit } from '@angular/core';
import { AccountDetails } from '../../../../../../../findyourtrashcan-mobile/src/shared/model/account-details';
import { AccountDetailsService } from './account-details.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../../../../../findyourtrashcan-mobile/src/shared/model/user';

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

  accountDetails: AccountDetails;

  createForm: FormGroup;

  constructor(private accountDetailsService: AccountDetailsService, private fb: FormBuilder) { }

  ngOnInit() {
    // this.createForm = this.fb.group({
    //   'username': new FormControl(this.accountDetails.user.username, [
    //     Validators.required,
    //   ]),
    //   'password': new FormControl(this.form.password, [
    //     Validators.required
    //   ]),
    //   'remember': new FormControl(this.form.remember, [])
    // });
  }

  /**
   * Filters all dates after today
   */
  birthdayFilter = (d: Date): boolean => {
    return d < this.today;
  }

}
