import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { InscriptionContext } from '../core/providers/inscription/inscription.service';
import { Logger } from '../core/providers/logger/logger.service';
import { Router } from '@angular/router';
import { AccountDetailsService } from '../core/providers/account-details/account-details.service';
import { AccountDetails } from '../core/model/account-details.model';

const log = new Logger('InscriptionComponent');

// export class FormUser implements InscriptionContext {
//   username = '';
//   password = '';
//   repeatPassword = '';
//   email = '';
//   firstName = '';
//   lastName = '';
//   birthday = new Date();
//   gender = false; // false si c'est un mec, true si c'est une femme
// }

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})

export class InscriptionComponent implements OnInit {

  createForm: FormGroup;
  hide = true;
  hideRepeat = true;
  // form: FormUser;
  message: string = null;

  constructor(private router: Router,
    private accountDetailsService: AccountDetailsService,
    private fb: FormBuilder) { }

  ngOnInit() {
    // this.form = new FormUser();
    // this.createForm = this.builder.group({
    //   'username': new FormControl(this.form.username, [
    //     Validators.required,
    //     Validators.minLength(4)
    //   ]),
    //   'password': new FormControl(this.form.password, [
    //     Validators.required,
    //     Validators.minLength(8)
    //   ]),
    //   'repeatPassword': new FormControl(this.form.repeatPassword, [
    //     Validators.required,
    //     Validators.minLength(8)
    //   ]),
    //   'email': new FormControl(this.form.email, [
    //     Validators.required,
    //     Validators.email
    //   ]),
    //   'firstName': new FormControl(this.form.firstName, [
    //     Validators.required,
    //     Validators.minLength(2)
    //   ]),
    //   'lastName': new FormControl(this.form.lastName, [
    //     Validators.required,
    //     Validators.minLength(2)
    //   ]),
    //   'birthday': new FormControl(this.form.birthday, [
    //     Validators.required
    //   ]),
    //   'gender': new FormControl(this.form.gender, [
    //     Validators.required
    //   ])
    // });

    this.createForm = this.fb.group({
      'user': this.fb.group({
        'id': '',
        'username': new FormControl('', [
          Validators.required,
        ]),
        'password': new FormControl('', [
          Validators.required
        ]),
        'email': new FormControl('', [
          Validators.required,
        ]),
      }),
      'id': '',
      'firstName': new FormControl('', []
      ),
      'lastName': new FormControl('', [
      ]),
      'birthday': new FormControl(new Date(), [
      ]),
      'repeatPassword': new FormControl('', [
      ]),
      'gender': new FormControl(false, [
      ]),

    });

  }

  sendValues(accountDetails: AccountDetails) {
    this.accountDetailsService.create(accountDetails)
      .finally(() => {
        this.createForm.markAsPristine();
      })
      .subscribe(credentials => {// si ça retourne pas d'erreur c'est que c'est bon
        log.debug(` user successfully created`);
        this.message = 'Your account is created ! you can log in now !';
      }, error => {
        log.debug(`creation error: ${error}`);
        this.message = error;
      });
  }

  get username() {
    return this.createForm.get('username');
  }

  getErrorMessageLogin() {
    return this.username.hasError('required') ? 'You must enter a value' :
      this.username.hasError('username') ? 'Not a valid username' : '';
  }

  get password() {
    return this.createForm.get('password');
  }

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('password') ? 'Not a valid password' : '';
  }

  get repeatPassword() {
    return this.createForm.get('repeatPassword');
  }

  getErrorMessageRepeatPassword() {
    return this.repeatPassword.hasError('required') ? 'You must enter a value' :
      this.repeatPassword.hasError('repeatPassword') ? 'Not a valid repeat password' : '';
  }

  get email() {
    return this.createForm.get('email');
  }

  getErrorMessageMail() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  get firstName() {
    return this.createForm.get('firstName');
  }

  getErrorMessageFirstName() {
    return this.firstName.hasError('required') ? 'You must enter a value' :
      this.firstName.hasError('firstName') ? 'Not a valid first name' : '';
  }

  get lastName() {
    return this.createForm.get('lastName');
  }

  getErrorMessageLastName() {
    return this.lastName.hasError('required') ? 'You must enter a value' :
      this.lastName.hasError('lastName') ? 'Not a valid last name' : '';
  }

  get birthday() {
    return this.createForm.get('birthday');
  }

  getErrorMessageBirthday() {
    return this.birthday.hasError('required') ? 'You must enter a value' :
      this.birthday.hasError('birthday') ? 'Not a valid birthday' : '';
  }

  get gender() {
    return this.createForm.get('gender');
  }

  getErrorMessageGender() {
    return this.gender.hasError('required') ? 'You must enter a value' :
      this.gender.hasError('gender') ? 'Not a valid gender' : '';
  }



}
