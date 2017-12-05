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

declare var google;

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  trashcans: Array<Trashcan> = [];
  maxBounds: MapBounds;

  filterIsRunning: boolean = false;
  loading;
  disconnected: boolean = false;
  dismissMessage: boolean = false;
  mapLoaded: boolean = false;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  // Our translated text strings
  private internalErrorFindingTrashcans: string;
  private pleaseWait: string;
  private noNetwork: string;
  private pleaseRetry: string;

  constructor(public navCtrl: NavController, public translateService: TranslateService, public geolocation: Geolocation,
    public loadingCtrl: LoadingController, public trashcanService: TrashcanService, public toastCtrl: ToastController,
    public network: Network) {

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
        let bounds = this.map.getBounds();
        let ne = new Point(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
        let sw = new Point(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());
        let mb = new MapBounds(ne, sw);
        this.loadTrashcans(mb);
      });
      this.dismissLoading();
      this.mapLoaded = true;

    }, (err) => {
      this.manageError(this.noNetwork + '. ' + this.pleaseRetry);
      this.dismissLoading();
    });
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



  loadTrashcans(mapBounds: MapBounds) {
    //Load trashcans in server by calling the api
    var i = 1;
    if (!this.disconnected) {
      this.trashcanService.getTrashcans(this.chooseBounds(mapBounds)).subscribe((res) => {
        for (let trashcan of res) {
          if (this.checkTrashcanArraysContains(trashcan)) {
            break;
          } else {
            setTimeout(() => {
              this.addTrashcan(trashcan);
            }, i * 200);
          }
          i++;
        }
      }, (err) => {
        this.manageError(this.internalErrorFindingTrashcans);
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

  addTrashcan(trashcan: Trashcan) {
    //Adding the object to our array
    this.trashcans.push(trashcan);
    console.log(this.getMarkerIcon(trashcan));
    //Creating the marker
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: this.getMarkerIcon(trashcan),
      position: { lat: trashcan.lat, lng: trashcan.lon }
    })
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