import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { I18nService } from '../../../i18n.service';
import { AuthenticationService } from './authentication.service';
import { Logger } from '../../../logger.service';
import { Router } from '@angular/router';

export class FormLogin {
  login?: string;
  password?: string;
  remember?: boolean;
}

const log = new Logger('login');

@Component({
  selector: 'app-login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.scss']
})

export class LoginComponent implements OnInit {

  isLoading: boolean;
  submitted = false;
  hide = true;
  error: string = null;
  createForm: FormGroup;
  form: FormLogin;

  constructor(private i18nService: I18nService, private router: Router,
    private authenticationService: AuthenticationService) { }
  ngOnInit() {
    this.isLoading = true;
    this.form = new FormLogin();
    this.createForm = new FormGroup({
      'login': new FormControl(this.form.login, [
        Validators.required,
      ]),
      'password': new FormControl(this.form.password, [
        Validators.required
      ]),
      'remember': new FormControl(this.form.remember, [])
    });
  }

  authenticate() {
    this.isLoading = true;
    this.authenticationService.login(this.createForm.value)
      .finally(() => {
        this.createForm.markAsPristine();
        this.isLoading = false;
      })
      .subscribe(credentials => {
        log.debug(`${credentials.username} successfully logged in`);
        this.router.navigate(['/accountdetails'], { replaceUrl: true });
      }, error => {
        log.debug(`Login error: ${error}`);
        this.error = error;
      });
  }

  get login() {
    return this.createForm.get('login');
  }

  getErrorMessageLogin() {
    return this.login.hasError('required') ? 'You must enter a value' :
      this.login.hasError('login') ? 'Not a valid login' : '';
  }

  get password() {
    return this.createForm.get('password');
  }

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('password') ? 'Not a valid password' : '';
  }

  get remember() {
    return this.createForm.get('remember');
  }

  onSubmit() {
    this.submitted = true;
  }

  stopClickPropagate(event: any) {
    event.stopPropagation();
  }
}
