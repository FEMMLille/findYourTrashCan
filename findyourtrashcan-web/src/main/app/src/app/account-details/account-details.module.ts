import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { AccountDetailsComponent } from './account-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AccountDetailsService } from '../core/providers/account-details/account-details.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AccountDetailsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountDetailsComponent
  ],
  providers: [
    AccountDetailsService
  ]
})
export class AccountDetailsModule { }
