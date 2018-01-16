import { AddTrashcanPopupComponent } from './../../components/add-trashcan-popup/add-trashcan-popup';
import { TrashcanTypeService } from './../../providers/trashcan/trashcan-type';
import { Location } from './../../shared/model/location';
import { GarbageType } from './../../shared/model/garbage-type';
import { MapBounds } from './../../shared/model/map-bounds';
import { TrashcanService } from './../../providers/trashcan/trashcan';
import { Point } from './../../shared/model/point';
import { Trashcan } from './../../shared/model/trashcan';
import { ProfilePage } from './../pages';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { TrashcanType } from '../../shared/model/trashcan-type';
import { GarbageTypeService } from '../../providers/providers';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { GoogleMapComponent } from './../../components/google-map/google-map';

declare var google;

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

  newTrashcans: boolean = false;
  addedTrashcan: boolean = false;



  // Our translated text strings
  private pleaseWait: string;

  constructor(public navCtrl: NavController, public translateService: TranslateService,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public network: Network) {


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

  /**
   * A function that handles filters
   */
  toggleFilter() {
    this.filterIsRunning = !this.filterIsRunning;
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
}