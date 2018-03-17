import { EqualValidatorDirective } from './../../directives/equal-validator/equal-validator';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';


import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage, EqualValidatorDirective,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    TranslateModule.forChild(),
    FormsModule
  ],
  exports: [
    SignupPage
  ]
})
export class SignupPageModule { }
