import { WelcomePage } from './../pages';
import { RankTypeService } from './../../providers/rank/rank-types';
import { RankService } from './../../providers/rank/rank';
import { AccountDetailsService } from './../../providers/user/account-details';
import { TranslateService } from '@ngx-translate/core';
import { User } from './../../shared/model/user';
import { AuthenticationService } from './../../providers/auth/authenticate';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { AccountDetails } from '../../shared/model/account-details';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    baseUser: User;
    user: User;
    account: AccountDetails = new AccountDetails();

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public items: Items, public acc: AccountDetailsService,
        public rService: RankService, public rtService: RankTypeService,
        public auth: AuthenticationService, public translateService: TranslateService, public toast: ToastController) {
        this.baseUser = this.user = auth._user;
        this.initProfile();
    }

    initProfile() {
        if (this.auth._user != null) {
            this.acc.getAccountDetailsFromUserId(this.auth._user.id).subscribe((res) => {
                this.account = res;
                console.log(res);
                //this.initRank(this.auth._user.id);
            }, (err) => {

            })
        } else {
            //this.initRank(this.auth._user.id);
        }
    }
    /*
        initRank(userId: number) {
            if (this.auth.account.rank == null) {
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
    */
    cancel() {
        this.navCtrl.pop();
    }

    logout() {
        //TODO - important ?
        this.auth.logout();
        this.navCtrl.setRoot(WelcomePage);
    }

    save() {
        /*
        this.acc.save(this.account).subscribe((res) => {
            this.toast.create({
                message: 'OK',
                duration: 3000,
                position: 'bottom'
            })
        });
        */
        this.toast.create({
            message: 'Not implemented',
            duration: 3000,
            position: 'bottom'
        }).present();
    }

}
