import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../../material.module';
import { CoreModule } from '../../../core.module';
import { AuthenticationService } from '../../../providers/auth/authentification.service';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    CoreModule
  ],
  declarations: [
  ],
  providers: [
    AuthenticationService
  ]
})

export class LoginModule { }
