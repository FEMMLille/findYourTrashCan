import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { AccountDetailsService } from "../../../../../../../findyourtrashcan-mobile/src/providers/user/account-details";

export class FormUser {
  login?: string;
  password?: string;
  repeatPassword?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  gender?: boolean;
}

@Component({
  selector: 'app-fytc-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})

export class AccountDetailsComponent implements OnInit {

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor() { }

  ngOnInit() {

  }

}
