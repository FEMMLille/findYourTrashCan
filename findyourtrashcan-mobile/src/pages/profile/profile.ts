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
    in = 4800;
    out = 5000;

    constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, public auth: AuthenticationService, public translateService: TranslateService, ) {
        this.baseUser = this.user = auth._user;
        console.log(this.user.account.birthDate);
    }

}
