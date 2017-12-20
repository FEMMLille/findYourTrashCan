import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { I18nService } from '../../core/providers/translation/i18n.service';
import { Logger } from '../../core/providers/logger/logger.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/providers/auth/authentification.service';
import { LoginContext } from '../../core/providers/auth/authentification.service';

export class FormLogin implements LoginContext {
  username = '';
  password = '';
  remember = false;
}

const log = new Logger('login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
    private authenticationService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = new FormLogin();
    this.createForm = this.fb.group({
      'username': new FormControl(this.form.username, [
        Validators.required,
      ]),
      'password': new FormControl(this.form.password, [
        Validators.required
      ]),
      'remember': new FormControl(this.form.remember, [])
    });
  }
  get getError() {
    return this.error;
  }
  authenticate() {
    this.authenticationService.login(this.createForm.value)
      .finally(() => {
        this.createForm.markAsPristine();
        this.isLoading = false;
      })
      .subscribe(credentials => {// si ça retourne pas d'erreur c'est que c'est bon
        log.debug(`${credentials} successfully logged in`);
        this.router.navigate(['/accountdetails'], { replaceUrl: true });
      }, error => {
        log.debug(`Login error: ${error}`);
        this.error = 'erreur lors de la connexion mot de passe ou identifiant invalide';
      });
  }

  get username() {
    return this.createForm.get('username');
  }

  getErrorMessageUsername() {
    return this.username.hasError('required') ? 'You must enter a value' :
      this.username.hasError('username') ? 'Not a valid login' : '';
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
