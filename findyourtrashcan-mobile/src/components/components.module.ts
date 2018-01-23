import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { GoogleMapComponent } from './google-map/google-map';
import { AddTrashcanPopupComponent } from './add-trashcan-popup/add-trashcan-popup';
import { DetailTrashcanPopupComponent } from './detail-trashcan-popup/detail-trashcan-popup';
@NgModule({
	declarations: [ProgressBarComponent,
    GoogleMapComponent,
    AddTrashcanPopupComponent],
	imports: [],
	exports: [ProgressBarComponent,
    GoogleMapComponent,
    AddTrashcanPopupComponent,
    DetailTrashcanPopupComponent],
})
export class ComponentsModule {}
