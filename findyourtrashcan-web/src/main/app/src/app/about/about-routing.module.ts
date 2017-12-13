import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Route } from '../core/providers/router/route.service';
import { extract } from '../core/providers/translation/i18n.service';
import { AboutComponent } from './about.component';

const routes: Routes = Route.withShell([
  { path: 'about', component: AboutComponent, data: { title: extract('About') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AboutRoutingModule { }
