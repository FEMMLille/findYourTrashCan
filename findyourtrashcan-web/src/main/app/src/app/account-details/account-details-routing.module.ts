import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { extract } from '../core/providers/translation/i18n.service';
import { AccountDetailsComponent } from './account-details.component';

const routes: Routes = [
  { path: 'accountdetails', component: AccountDetailsComponent, data: { title: extract('AccountDetails') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccountDetailsRoutingModule { }
