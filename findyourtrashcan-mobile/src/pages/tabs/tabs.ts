import { AddTrashcanPopupComponent } from './../../components/add-trashcan-popup/add-trashcan-popup';
import { FilterTrashcanPopupComponent } from './../../components/filter-trashcan-popup/filter-trashcan-popup';
import { TrashcanTypeService } from './../../providers/trashcan/trashcan-type';
import { Location } from './../../shared/model/location';
import { GarbageType } from './../../shared/model/garbage-type';
import { MapBounds } from './../../shared/model/map-bounds';
import { TrashcanService } from './../../providers/trashcan/trashcan';
import { Point } from './../../shared/model/point';
import { Trashcan } from './../../shared/model/trashcan';
import { AuthenticationService } from './../../providers/auth/authenticate';
import { RangService } from './../../providers/rang/rang';
import { Rang } from './../../shared/model/rank';
import { ProfilePage } from './../pages';
import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { RewardsPage } from './../pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  filterIsRunning: boolean = false;
  loading;
  disconnected: boolean = false;
  dismissMessage: boolean = false;
  openAddedTrashcanPopup: boolean = false;
  openFilterTrashcanPopup: boolean = false;

  showDetailTrashcanPopup: boolean = false;
  newTrashcans: boolean = false;
  addedTrashcan: boolean = false;
  directionTrashcan: Trashcan = new Trashcan();
  showingTrashcan: Trashcan = undefined;
  reloadTrashcans: boolean = false;
  reloadTrashcansFiltered: Array<Trashcan> = [];


  userRank: Rang;



  // Our translated text strings
  private pleaseWait: string;

  constructor(public navCtrl: NavController, public translateService: TranslateService,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public network: Network, public changesDetectorRef: ChangeDetectorRef,
    public ngZone: NgZone, public rangService: RangService, public auth: AuthenticationService) {
    this.translateService.get('PLEASE_WAIT').subscribe((value) => {
      this.pleaseWait = value;
    });
  }


  ionViewDidLoad() {
    /**
    * Show a message if we are disconnected
    */
    this.network.onDisconnect().subscribe(() => {
      this.disconnected = true;
    });

    this.network.onConnect().subscribe(() => {
      this.disconnected = false;
      this.dismissMessage = false;
    });
  }

  /**
   * Dismiss the network message when we want to (it is reset when we are connected back)
   */
  dismissNoNetworkMessage() {
    this.dismissMessage = true;
  }

  /**
   * Navigation functions (clicking on tabs)
   */

  /**
   * Toggles the profile page
   */
  gotoProfile() {
    this.navCtrl.push(ProfilePage);
  }

  gotoRewards() {
    this.navCtrl.push(RewardsPage);
  }

  /**
   * A function that handles filters
   */
  toggleFilter() {
    this.filterIsRunning = !this.filterIsRunning;
  }

  /**
   * A function that open filter popup
   */
  toggleFilterPopup() {
    //console.log(this.openFilterTrashcanPopup);
    if (this.openFilterTrashcanPopup) {
      //Cancel filters
      this.orderReloadTrashcans();
    }
    this.openFilterTrashcanPopup = !this.openFilterTrashcanPopup;
  }

  /**
   * Handling loading time
   */
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: this.pleaseWait + '...'
    });
    this.loading.present();
  }

  /**
   * Dismiss loading
   */
  dismissLoading() {
    this.loading.dismiss();
  }

  /**
   * A function called when the map is loaded or not
   * @param loading The boolean telling us whether we should load or not
   */
  handleLoading(loading: boolean) {
    if (loading) this.presentLoading();
    else this.dismissLoading();
  }

  /**
   * A function called when we close the "add a trashcan" popup
   * @param added The boolean telling us if a trashcan has been added using the proper popup
   */
  trashcanAdded(added: boolean) {
    this.addedTrashcan = added;
    this.openAddedTrashcanPopup = false;
    this.addPointsToRank(2000);
  }

  /**
   * A function called when we close the "fiter a trashcan" popup
   * @param filtered The trashcans filtered
   */
  trashcanFiltered(filtered: Array<Trashcan>) {
    this.reloadTrashcansFiltered = filtered;
  }

  orderReloadTrashcans() {
    console.log("order reload trashcans");
    this.reloadTrashcans = true;
    this.showingTrashcan = undefined;
    this.changesDetectorRef.detectChanges();
    this.ngZone.runOutsideAngular(() => {
      this.reloadTrashcans = false;
    });
    this.addPointsToRank(1000);
  }

  addPointsToRank(score: number) {
    let oldRankTypeId = this.auth._rank.rangType.id;
    let newRankTypeId = this.auth.addPointsToRank(score);
    if (newRankTypeId > oldRankTypeId) {
      this.manageError("Félicitations !  Vous venez de passer au rang supérieur, allez voir les avantages qui vous sont accessibles sur la page des récompenses !");
    }
  }

  /**
   * A function handling error messages
   * @param msg the message we want to send
   */
  manageError(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });
    toast.present();
  }

  updateDirection(trashcan: Trashcan) {
    if (trashcan != null)
      this.directionTrashcan = trashcan;
    this.showingTrashcan = undefined;
    this.changesDetectorRef.detectChanges();
    this.addPointsToRank(1500);
  }

  displayPopup(trashcan: Trashcan) {
    this.showingTrashcan = trashcan;
    this.changesDetectorRef.detectChanges();
  }

}