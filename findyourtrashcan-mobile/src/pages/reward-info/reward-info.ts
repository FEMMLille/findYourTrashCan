import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Rewards } from '../../shared/model/rewards';

@IonicPage()
@Component({
  selector: 'page-reward-info',
  templateUrl: 'reward-info.html',
})
export class RewardInfoPage {

  reward: Rewards;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reward = navParams.data;
  }

  ionViewDidLoad() {
  }

}
