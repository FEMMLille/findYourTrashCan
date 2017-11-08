import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from './location.service';
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
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  providers: [LocationService]
})

export class InscriptionComponent implements OnInit {

  /*email = new FormControl('', [Validators.required, Validators.email]);
  login = new FormControl('', [Validators.required, Validators.minLength(4)]);
  password = new FormControl('', [Validators.required]);*/

  createForm: FormGroup;

  form: FormUser;

  constructor(private locationService: LocationService, private builder: FormBuilder) { }

  ngOnInit() {
    this.form = new FormUser();
    this.createForm = new FormGroup({
      'login': new FormControl(this.form.login, [
        Validators.required,
        Validators.minLength(4)
      ]),
      'password': new FormControl(this.form.password, [
        Validators.required,
        Validators.minLength(8)
      ]),
      'repeatPassword': new FormControl(this.form.repeatPassword, [
        Validators.required,
        Validators.minLength(8)
      ]),
      'email': new FormControl(this.form.email, [
        Validators.required,
        Validators.email
      ]),
      'firstName': new FormControl(this.form.firstName, [
        Validators.required,
        Validators.minLength(2)
      ]),
      'lastName': new FormControl(this.form.lastName, [
        Validators.required,
        Validators.minLength(2)
      ]),
      'birthday': new FormControl(this.form.birthday, [
        Validators.required
      ]),
      'gender': new FormControl(this.form.gender, [
        Validators.required
      ])
    });
  }

  get login() {
    return this.createForm.get('login');
  }

  get password() {
    return this.createForm.get('password');
  }

  get repeatPassword() {
    return this.createForm.get('repeatPassword');
  }

  get email() {
    return this.createForm.get('email');
  }

  get firstName() {
    return this.createForm.get('firstName');
  }

  get lastName() {
    return this.createForm.get('lastName');
  }

  get birthday() {
    return this.createForm.get('birthday');
  }

  get gender() {
    return this.createForm.get('gender');
  }

  getErrorMessage() {
    return this.createForm.get('email').hasError('required') ? 'You must enter a value' :
      this.createForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

}
