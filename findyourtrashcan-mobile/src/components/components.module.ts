import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { GoogleMapComponent } from './google-map/google-map';
import { AddTrashcanPopupComponent } from './add-trashcan-popup/add-trashcan-popup';

@NgModule({
	declarations: [ProgressBarComponent,
    GoogleMapComponent,
    AddTrashcanPopupComponent],
	imports: [],
	exports: [ProgressBarComponent,
    GoogleMapComponent,
    AddTrashcanPopupComponent
    ]
})
export class ComponentsModule {}
