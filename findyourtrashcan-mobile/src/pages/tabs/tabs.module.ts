import { AddTrashcanPopupComponent } from './../../components/add-trashcan-popup/add-trashcan-popup';
import { DetailTrashcanPopupComponent } from './../../components/detail-trashcan-popup/detail-trashcan-popup';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsPage } from './tabs';
import { GoogleMapComponent } from '../../components/google-map/google-map';
import { DetailPopupService } from '../../providers/providers';
import { SetFavoriteSearchPopupComponent } from '../../components/set-favorite-search-popup/set-favorite-search-popup';

@NgModule({
  declarations: [
    TabsPage,
    GoogleMapComponent,
    AddTrashcanPopupComponent,
    SetFavoriteSearchPopupComponent
    DetailTrashcanPopupComponent
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    TranslateModule.forChild(),
  ],
  providers:[
    DetailPopupService
  ],
  exports: [
    TabsPage
  ]
})
export class TabsPageModule { }
