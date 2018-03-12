import { Component, ChangeDetectorRef, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DetailPopupService } from '../../providers/detailpopup/detailpopup';
import { Trashcan } from '../../shared/model/trashcan';
import { Camera } from 'ionic-native';

/**
 * Generated class for the AddTrashcanPopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'detail-trashcan-popup',
  templateUrl: 'detail-trashcan-popup.html'
})

export class DetailTrashcanPopupComponent {
  /**
   * boolean for opening or not the popup
   */
  public openPopup: boolean = true;
  /**
   * current trashcan opened
   */
  public trashcan: Trashcan;

  public showDetailsPopup: boolean = false;
  public showingTrashcan: Trashcan = undefined;
  public base64Image: string;

  constructor(public translateService: TranslateService, public detailPopupService: DetailPopupService, public changesDetectorRef: ChangeDetectorRef) {
    this.detailPopupService.showViewObservable().subscribe((bool: boolean) => {
      this.trashcan = (this.detailPopupService.currentTrashcan) ? this.detailPopupService.currentTrashcan : null;
      this.openPopup = bool;
      this.changesDetectorRef.detectChanges();
    });
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      console.log(this.base64Image);
    }, (err) => {
        console.log(err);
    });
  }

  dismissPopup() {
    this.trashcan = undefined;
    this.changesDetectorRef.detectChanges();
    this.showRouteToTrashcan.emit(null);
  }

  @Input()
  showedTrashcan: Trashcan;

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['showedTrashcan']) {
      this.showDetailsPopup = (this.showingTrashcan != undefined);
      this.trashcan = changes['showedTrashcan'].currentValue;
    }

  }

  @Output()
  showRouteToTrashcan = new EventEmitter();

  goTo() {
    this.showRouteToTrashcan.emit(this.trashcan);
    this.dismissPopup();
  }


}