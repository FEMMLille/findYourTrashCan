import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { extract } from '../core/providers/translation/i18n.service';
import { InscriptionComponent } from './inscription.component';

const routes: Routes = [{ path: 'inscription', component: InscriptionComponent, data: { title: extract('Inscription') } }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InscriptionRoutingModule { }
