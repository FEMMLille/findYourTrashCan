import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardInfoPage } from './reward-info';

@NgModule({
  declarations: [
    RewardInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardInfoPage),
  ], exports: [
    RewardInfoPage
  ]
})
export class RewardInfoPageModule { }
