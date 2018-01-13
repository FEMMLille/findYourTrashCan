import { TrashcanTypeService } from './../../providers/trashcan/trashcan-type';
import { Location } from './../../shared/model/location';
import { GarbageType } from './../../shared/model/garbage-type';
import { MapBounds } from './../../shared/model/map-bounds';
import { TrashcanService } from './../../providers/trashcan/trashcan';
import { Point } from './../../shared/model/point';
import { Trashcan } from './../../shared/model/trashcan';
import { ProfilePage } from './../pages';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { TrashcanType } from '../../shared/model/trashcan-type';
import { GarbageTypeService } from '../../providers/providers';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

declare var google;

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  trashcans: Array<Trashcan> = [];
  maxBounds: MapBounds;
  addedTrashcan: Trashcan = new Trashcan();
  showAddTrashcanPopup: boolean = false;
  listSelectedGarbageType: string = '...';

  filterIsRunning: boolean = false;
  loading;
  disconnected: boolean = false;
  dismissMessage: boolean = false;
  mapLoaded: boolean = false;
  trashcanTypes: Array<TrashcanType> = [];
  garbageTypes: Array<GarbageType> = [];

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  // Our translated text strings
  private internalErrorFindingTrashcans: string;
  private pleaseWait: string;
  private noNetwork: string;
  private pleaseRetry: string;
  private chooseGarbageType: string;
  private cancelLabel: string;

  constructor(public navCtrl: NavController, public translateService: TranslateService, public geolocation: Geolocation,
    public loadingCtrl: LoadingController, public trashcanService: TrashcanService, public toastCtrl: ToastController,
    public network: Network, public trashcanTypeService: TrashcanTypeService, public garbageTypeService: GarbageTypeService,
    public actionSheetCtrl: ActionSheetController) {

    this.translateService.get('INTERNAL_ERROR_FIND_TRASHCANS').subscribe((value) => {
      this.internalErrorFindingTrashcans = value;
    });

    this.translateService.get('PLEASE_WAIT').subscribe((value) => {
      this.pleaseWait = value;
    });

    this.translateService.get('NO_NETWORK').subscribe((value) => {
      this.noNetwork = value;
    });

    this.translateService.get('PLEASE_RETRY').subscribe((value) => {
      this.pleaseRetry = value;
    });

    this.translateService.get('CHOOSE_GARBAGE_TYPE').subscribe((value) => {
      this.chooseGarbageType = value;
    });

    this.translateService.get('CANCEL_BUTTON').subscribe((value) => {
      this.cancelLabel = value;
    });

    this.trashcanTypeService.get().subscribe((values) => {
      console.log(values);
      this.trashcanTypes = values;
    });

    this.garbageTypeService.get().subscribe((values) => {
      console.log(values);
      this.garbageTypes = values;
    });



    this.addedTrashcan.empty = true;
    this.addedTrashcan.garbageType = new GarbageType(1);
    this.addedTrashcan.picture = "";
    this.addedTrashcan.trashcanType = new TrashcanType(1);
    this.addedTrashcan.location = new Location(59000);
  }

  ionViewDidLoad() {
    this.loadMap();
    this.network.onDisconnect().subscribe(() => {
      this.disconnected = true;
    });

    this.network.onConnect().subscribe(() => {
      this.disconnected = false;
      this.dismissMessage = false;
      if (!this.mapLoaded)
        this.loadMap();
    });
  }

  toggleFilter() {
    if (this.filterIsRunning == false)
      this.filterIsRunning = true;
    else
      this.filterIsRunning = false;
  }

  updateAddedTrashcanType(id: number) {
    this.addedTrashcan.trashcanType = new TrashcanType(id);
  }

  updateAddedTrashcanGarbage(id: number) {
    this.addedTrashcan.garbageType = new GarbageType(id);
  }

  showActionSheet() {
    let buttons: Array<any> = [];

    for (let type of this.garbageTypes) {
      if (type.id > 3) {
        buttons.push({
          text: type.label,
          handler: () => {
            this.updateGarbageTypeFromActionSheet(type.id, type.label);
          }
        });
      }
    }
    buttons.push({
      text: this.cancelLabel,
      role: 'cancel'
    })

    let actionSheet = this.actionSheetCtrl.create({
      title: this.chooseGarbageType,
      buttons: buttons
    });
    actionSheet.present();
  }

  updateGarbageTypeFromActionSheet(id: number, label: string) {
    this.updateAddedTrashcanGarbage(id);
    this.listSelectedGarbageType = label;
  }

  loadMap() {
    this.presentLoading();
    this.geolocation.getCurrentPosition().then((position) => {
      let myPosition = new Point(position.coords.latitude, position.coords.longitude)
      let mapOptions = {
        center: new google.maps.LatLng(myPosition.lat, myPosition.lon),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.trashcans = [];
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.maxBounds = new MapBounds(new Point(myPosition.lat + 5, myPosition.lon + 3), new Point(myPosition.lat - 5, myPosition.lon - 3));
      this.map.addListener('idle', () => {
        this.loadTrashcans(this.getMapBounds());
      });
      this.dismissLoading();
      this.mapLoaded = true;

    }, (err) => {
      this.manageError(this.noNetwork + '. ' + this.pleaseRetry);
      this.dismissLoading();
    });
  }

  getMapBounds(): MapBounds {
    let bounds = this.map.getBounds();
    let ne = new Point(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
    let sw = new Point(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());
    let mb = new MapBounds(ne, sw);
    return mb;
  }

  dismissNoNetworkMessage() {
    this.dismissMessage = true;
  }

  gotoProfile() {
    this.navCtrl.push(ProfilePage);
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: this.pleaseWait + '...'
    });
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

  toggleAddTrashcanPopup() {
    this.showAddTrashcanPopup = !this.showAddTrashcanPopup;
  }

  loadTrashcans(mapBounds: MapBounds) {
    var i = 1;
    if (!this.disconnected) {
      this.trashcanService.getTrashcans(this.chooseBounds(mapBounds)).subscribe((res) => {
        for (let trashcan of res) {
          if (this.checkTrashcanArraysContains(trashcan)) {
            break;
          } else {
            setTimeout(() => {
              this.renderTrashcan(trashcan);
            }, i * 200);
          }
          i++;
        }
      }, (err) => {
        this.manageError(this.internalErrorFindingTrashcans);
        console.log(err);
      });
    } else {
      this.manageError(this.noNetwork + '.  ' + this.pleaseRetry);
    }
  }

  chooseBounds(mapBounds: MapBounds): MapBounds {
    let neLat = (mapBounds.northEast.lat > this.maxBounds.northEast.lat) ? this.maxBounds.northEast.lat : mapBounds.northEast.lat;
    let neLon = (mapBounds.northEast.lon > this.maxBounds.northEast.lon) ? this.maxBounds.northEast.lon : mapBounds.northEast.lon;
    let swLat = (mapBounds.southWest.lat < this.maxBounds.southWest.lat) ? this.maxBounds.southWest.lat : mapBounds.southWest.lat;
    let swLon = (mapBounds.southWest.lon < this.maxBounds.southWest.lon) ? this.maxBounds.southWest.lon : mapBounds.southWest.lon;
    return new MapBounds(new Point(neLat, neLon), new Point(swLat, swLon));
  }

  checkTrashcanArraysContains(testedTrashcan: Trashcan): boolean {
    for (let trashcan of this.trashcans) {
      if (trashcan.id == testedTrashcan.id)
        return true;
    }
    return false;
  }

  renderTrashcan(trashcan: Trashcan) {
    //Adding the object to our array
    this.trashcans.push(trashcan);
    //Creating the marker
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: this.getMarkerIcon(trashcan),
      position: { lat: trashcan.lat, lng: trashcan.lon }
    })
  }

  addTrashcan(trashcan: Trashcan) {
    if (!this.disconnected) {
      this.geolocation.getCurrentPosition().then((position) => {
        this.addedTrashcan.lat = position.coords.latitude;
        this.addedTrashcan.lon = position.coords.longitude;
        this.trashcanService.addTrashcan(this.addedTrashcan).subscribe((res) => {
          this.renderTrashcan(this.addedTrashcan);
        }, (err) => {
          this.manageError(this.pleaseRetry);
        });
      }, (err) => {
        this.manageError(this.pleaseRetry);
      });
      this.dismissAddingPopup();
    } else {
      this.manageError(this.noNetwork + '.  ' + this.pleaseRetry);
    }
  }

  dismissAddingPopup() {
    this.showAddTrashcanPopup = false;
  }

  getMarkerIcon(t: Trashcan) {
    let empty: string = t.empty ? '0' : '1';
    let path: string = '' + t.trashcanType.id + t.garbageType.id;
    return 'assets/img/icons/processed/' + empty + path + '.png';
  }

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