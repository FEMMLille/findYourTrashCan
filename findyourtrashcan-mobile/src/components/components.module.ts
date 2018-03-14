import { NgModule } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation'; 
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { GoogleMapComponent } from './google-map/google-map';
import { AddTrashcanPopupComponent } from './add-trashcan-popup/add-trashcan-popup';
<<<<<<< HEAD
=======
import { DetailTrashcanPopupComponent } from './detail-trashcan-popup/detail-trashcan-popup';
import { DetailPopupService } from '../providers/providers';
>>>>>>> develop

@NgModule({
	declarations: [ProgressBarComponent,
    GoogleMapComponent,
    AddTrashcanPopupComponent],
	imports: [],
	exports: [ProgressBarComponent,
    GoogleMapComponent,
<<<<<<< HEAD
    AddTrashcanPopupComponent
=======
    AddTrashcanPopupComponent,
    DetailTrashcanPopupComponent],
    providers:[
        DetailPopupService,
        Geolocation
>>>>>>> develop
    ]
})
export class ComponentsModule {}
