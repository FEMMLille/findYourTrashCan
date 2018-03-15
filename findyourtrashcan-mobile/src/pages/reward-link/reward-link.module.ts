import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardLinkPage } from './reward-link';

@NgModule({
  declarations: [
    RewardLinkPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardLinkPage),
  ],
  exports: [
    RewardLinkPage
  ]
})
export class RewardLinkPageModule { }
