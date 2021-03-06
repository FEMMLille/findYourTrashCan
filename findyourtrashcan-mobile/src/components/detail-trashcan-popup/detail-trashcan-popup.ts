import { RangService } from './../../providers/rang/rang';
import { AuthenticationService } from './../../providers/auth/authenticate';
import { TrashcanService } from './../../providers/trashcan/trashcan';
import { Component, ChangeDetectorRef, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DetailPopupService } from '../../providers/detailpopup/detailpopup';
import { Trashcan } from '../../shared/model/trashcan';
import { Rang } from '../../shared/model/rank';

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
  public userIsTownStaff: boolean = false;
  public signalable: boolean = false;

  constructor(public trashcanService: TrashcanService, public translateService: TranslateService,
    public detailPopupService: DetailPopupService, public changesDetectorRef: ChangeDetectorRef,
    public auth: AuthenticationService, public rankService: RangService) {
    this.detailPopupService.showViewObservable().subscribe((bool: boolean) => {
      this.trashcan = (this.detailPopupService.currentTrashcan) ? this.detailPopupService.currentTrashcan : null;
      this.openPopup = bool;
      this.changesDetectorRef.detectChanges();
      this.userIsTownStaff = this.auth.isTownStaff() ? true : false
      this.checkSignalable();
    });
  }

  dismissPopup() {
    this.trashcan = undefined;
    this.changesDetectorRef.detectChanges();
    this.showRouteToTrashcan.emit(null);
  }

  updateTrashcanEmptyState(trashcanFillingState: boolean) {
    this.trashcan.empty = trashcanFillingState;
    this.saveTrashcan();
  }

  signalAsTrustworthy(trashcanIsTrustworthy: boolean) {
    this.trashcan.trustworthy = trashcanIsTrustworthy;
    this.saveTrashcan();
  }

  saveTrashcan() {
    this.trashcanService.updateTrashcan(this.trashcan).subscribe((res) => {
      this.reloadTrashcans.emit();
      this.dismissPopup;
      console.log("reloadTrashcans emitted");
    });
  }

  deleteTrashcan() {
    this.trashcanService.deleteTrashcan(this.trashcan.id).subscribe((res) => {
      this.reloadTrashcans.emit();
      this.dismissPopup();
    });
  }

  checkSignalable() {
    this.signalable = (this.auth._rank != undefined && this.auth._rank.rangType.id >= 1 || this.userIsTownStaff)
  }

  @Input()
  showedTrashcan: Trashcan;

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['showedTrashcan']) {
      this.showDetailsPopup = (this.showingTrashcan != undefined);
      console.log(this.showDetailsPopup);
      this.trashcan = changes['showedTrashcan'].currentValue;
    }

  }

  @Output()
  showRouteToTrashcan = new EventEmitter();

  @Output()
  reloadTrashcans = new EventEmitter();

  goTo() {
    this.showRouteToTrashcan.emit(this.trashcan);
    this.dismissPopup();
  }


}