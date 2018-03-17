import { RangType } from './../../shared/model/rank-type';
import { Rang } from './../../shared/model/rank';
import { WelcomePage } from './../pages';
import { RangTypeService } from './../../providers/rang/rang-types';
import { RangService } from './../../providers/rang/rang';
import { AccountDetailsService } from './../../providers/user/account-details';
import { TranslateService } from '@ngx-translate/core';
import { User } from './../../shared/model/user';
import { AuthenticationService } from './../../providers/auth/authenticate';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatePipe } from '@angular/common';

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
    rank: Rang
    displayedBirthdate: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public items: Items, public acc: AccountDetailsService,
        public rService: RangService, public rtService: RangTypeService,
        public auth: AuthenticationService, public translateService: TranslateService,
        public toast: ToastController, public datePipe: DatePipe) {
        this.baseUser = this.user = auth._user;
        this.rank = this.auth._rank;
        this.initProfile();
    }

    initProfile() {
        if (this.auth._user != null) {
            this.acc.getAccountDetailsFromUserId(this.auth._user.id).subscribe((res) => {
                this.account = res;
            }, (err) => {

            })
        }
    }

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
