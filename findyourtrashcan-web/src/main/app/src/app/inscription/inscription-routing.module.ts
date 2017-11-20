import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { InscriptionComponent } from './inscription.component';

const routes: Routes = Route.withShell([
  { path: 'inscription', component: InscriptionComponent, data: { title: extract('Inscription') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InscriptionRoutingModule { }
