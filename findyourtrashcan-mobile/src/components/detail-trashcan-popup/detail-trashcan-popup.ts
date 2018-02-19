import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DetailPopupService } from '../../providers/detailpopup/detailpopup';
import { Trashcan } from '../../shared/model/trashcan';

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

  constructor(public translateService: TranslateService, public detailPopupService: DetailPopupService) {
    this.detailPopupService.showViewObservable().subscribe((bool: boolean) => {
      this.trashcan = (this.detailPopupService.currentTrashcan) ? this.detailPopupService.currentTrashcan : null;
      this.openPopup = bool;
    });
  }
  dismissPopup() {
    this.detailPopupService.subscribeShow(false, null);
  }

  @Output()
  showRouteToTrashcan = new EventEmitter();
}