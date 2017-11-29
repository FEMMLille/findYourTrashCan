import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AboutRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AboutRoutingModule
  ],
  declarations: [
    SupportComponent
  ]
})
export class SupportModule { }
