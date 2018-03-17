import { Rewards } from './../../shared/model/rewards';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reward-link',
  templateUrl: 'reward-link.html',
})
export class RewardLinkPage {

  reward: Rewards;
  link: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reward = navParams.data.reward;
    this.link = navParams.data.link;
  }

  ionViewDidLoad() {
  }

}
