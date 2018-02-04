import { Component, ChangeDetectorRef } from '@angular/core';
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

  public openPopup: boolean = true;
  public trashcan: Trashcan;

  constructor(public translateService: TranslateService, public changeDetectorRef: ChangeDetectorRef, public detailPopupService: DetailPopupService) {
    this.detailPopupService.showViewObservable().subscribe((bool: boolean) => {
      this.trashcan = (this.detailPopupService.currentTrashcan) ? this.detailPopupService.currentTrashcan : null;
      console.log(this.trashcan);
      this.openPopup = bool;
      this.changeDetectorRef.detectChanges();
    });
  }
}