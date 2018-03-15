import { RewardInfoPage } from './../reward-info/reward-info';
import { LocationService } from './../../providers/location/location';
import { Point } from './../../shared/model/point';
import { Api } from './../../providers/api/api';
import { RewardLinkPage } from './../reward-link/reward-link';
import { RewardsService } from './../../providers/rewards/rewards';
import { AuthenticationService } from './../../providers/auth/authenticate';
import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Rewards } from '../../shared/model/rewards';

@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {

  rewards = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public rewardsService: RewardsService, public auth: AuthenticationService,
    public api: Api, public geolocation: Geolocation, public locationService: LocationService) {

  }

  ionViewDidLoad() {
    console.log(this.auth._user);
    if (this.auth._rank != undefined)
      //this.auth.reloadRank();
      this.rewardsService.getRewardsForRankTypeId(this.auth._rank.rangType.id).subscribe((res) => {
        this.rewards = res;
      })
  }

  rewardSelected(reward: Rewards) {

    let contactLink: string;
    let garbageCollectionDays: string;

    this.geolocation.getCurrentPosition().then((position) => {
      let myPosition = new Point(position.coords.latitude, position.coords.longitude);
      //Commented in order to avoid to use all our quota
      //this.api.getGeolocationStreet(myPosition.lat, myPosition.lon).subscribe((res: any) => {
      //let postalCode = res.results[0].address_components[res.results[0].address_components.length - 1].long_name;
      let postalCode = 59800;
      this.locationService.getLocationByCode(postalCode).subscribe((res) => {
        contactLink = res.webContact;
        garbageCollectionDays = res.webInformations;

        if (reward.id == 0) {
          this.navCtrl.push(RewardLinkPage, { reward: reward, link: garbageCollectionDays });
        } else if (reward.id == 1 || reward.id == 5 || reward.id == 6) {
          this.navCtrl.push(RewardLinkPage, { reward: reward, link: contactLink });
        } else if (reward.id == 2 || reward.id == 3 || reward.id == 4 || reward.id == 7) {
          this.navCtrl.push(RewardInfoPage, reward);
        }
      });
      //});
    });




  }

}
