import { RankTypeService } from './../../providers/rank/rank_types';
import { RankService } from './../../providers/rank/rank';
import { AccountDetailsService } from './../../providers/user/account-details';
import { ProgressBarComponent } from './../../components/progress-bar/progress-bar';
import { TranslateService } from '@ngx-translate/core';
import { User } from './../../shared/model/user';
import { AuthenticationService } from './../../providers/auth/authenticate';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    baseUser: User;
    user: User;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public items: Items, public acc: AccountDetailsService,
        public rService: RankService, public rtService: RankTypeService,
        public auth: AuthenticationService, public translateService: TranslateService, ) {
        this.baseUser = this.user = auth._user;
        this.initProfile();
    }

    initProfile() {
        if (this.auth._user.account == null) {
            this.acc.getAccountDetailsFromUserId(this.auth._user.id).subscribe((res) => {
                this.auth._user.account = res;
                this.initRank(this.auth._user.id);
            }, (err) => {

            })
        } else {
            this.initRank(this.auth._user.id);
        }
    }

    initRank(userId: number) {
        if (this.auth._user.account.rank == null) {
            this.rService.getRankForUser(userId).subscribe((res) => {
                this.auth._user.account.rank = res;
                this.initRankType(this.auth._user.account.rank.rankId);
            }, (err) => {

            })
        } else {
            this.initRankType(this.auth._user.account.rank.rankId);
        }
    }

    initRankType(rankId: number) {
        if (this.auth._user.account.rankType == null) {
            this.rService.getRankForUser(rankId).subscribe((res) => {
                this.auth._user.account.rankType = res;
            }, (err) => {

            })
        }
    }

    cancel() {
        this.navCtrl.pop();
    }

}
