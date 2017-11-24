import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { InscriptionRoutingModule } from './inscription-routing.module';
import { InscriptionComponent } from './inscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { LocationService } from './location.service';
import { InscriptionService } from './inscription.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    InscriptionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    InscriptionComponent
  ],
  providers: [
    LocationService,
    InscriptionService
  ]
})
export class InscriptionModule { }
