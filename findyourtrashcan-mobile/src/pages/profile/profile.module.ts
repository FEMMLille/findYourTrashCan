import { ProgressBarComponent } from './../../components/progress-bar/progress-bar';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ProfilePage } from './profile';

@NgModule({
    declarations: [
        ProfilePage,
        ProgressBarComponent
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        TranslateModule.forChild()
    ],
    exports: [
        ProfilePage
    ]
})
export class SearchPageModule { }
