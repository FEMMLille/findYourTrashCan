import { MapBounds } from './../../shared/model/map-bounds';
import { TrashcanService } from './../../providers/trashcan/trashcan';
import { Point } from './../../shared/model/point';
import { Trashcan } from './../../shared/model/trashcan';
import { ProfilePage } from './../pages';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  trashcans: Array<Trashcan> = [];

  filterIsRunning: boolean = false;
  loading;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public translateService: TranslateService, public geolocation: Geolocation
    , public loadingCtrl: LoadingController, public trashcanService: TrashcanService) {

  }

  ionViewDidLoad() {
    this.loadMap();
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

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('idle', () => {
        let bounds = this.map.getBounds();
        console.log(bounds.getNorthEast());
        let ne = new Point(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
        let sw = new Point(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());
        let mb = new MapBounds(ne, sw);
        this.loadTrashcans(mb);
      });
      this.dismissLoading();
    }, (err) => {
      console.log(err);
    })
  }

  gotoProfile() {
    this.navCtrl.push(ProfilePage);
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }



  loadTrashcans(mapBounds: MapBounds) {
    //Load trashcans in server by calling the api
    var i = 1;
    this.trashcanService.getTrashcans(mapBounds).subscribe((res) => {
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
    });
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
}