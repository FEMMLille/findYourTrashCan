import { AddTrashcanPopupComponent } from './../../components/add-trashcan-popup/add-trashcan-popup';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsPage } from './tabs';
import { GoogleMapComponent } from '../../components/google-map/google-map';

@NgModule({
  declarations: [
    TabsPage,
    GoogleMapComponent,
    AddTrashcanPopupComponent
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    TranslateModule.forChild()
  ],
  exports: [
    TabsPage
  ]
})
export class TabsPageModule { }
