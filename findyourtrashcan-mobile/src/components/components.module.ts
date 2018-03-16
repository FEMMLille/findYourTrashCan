import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { GoogleMapComponent } from './google-map/google-map';
import { AddTrashcanPopupComponent } from './add-trashcan-popup/add-trashcan-popup';
import { DetailTrashcanPopupComponent } from './detail-trashcan-popup/detail-trashcan-popup';
import { DetailPopupService } from '../providers/providers';

@NgModule({
	declarations: [ProgressBarComponent,
    GoogleMapComponent,
    AddTrashcanPopupComponent,
	exports: [ProgressBarComponent,
    GoogleMapComponent,
    AddTrashcanPopupComponent,
    DetailTrashcanPopupComponent],
    providers:[
        DetailPopupService,
        Geolocation
    ]
})
export class ComponentsModule {}
