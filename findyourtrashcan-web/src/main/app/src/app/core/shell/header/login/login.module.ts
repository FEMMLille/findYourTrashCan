import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../../shared/shared.module';
import { MaterialModule } from '../../../../material.module';
import { CoreModule } from '../../../core.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    MaterialModule,
    CoreModule
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class LoginModule { }
