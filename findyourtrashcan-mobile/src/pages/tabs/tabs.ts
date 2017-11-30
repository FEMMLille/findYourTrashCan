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

  markers: Array<Trashcan> = [
    new Trashcan(1, 1, 1, false, new Point(50.6117179, 3.1367745), 'empty', 1),
    new Trashcan(1, 1, 2, false, new Point(50.6137179, 3.1394745), 'empty', 1),
    new Trashcan(1, 1, 3, false, new Point(50.6117179, 3.1312745), 'empty', 1),
    new Trashcan(1, 1, 4, false, new Point(50.6107179, 3.1323745), 'empty', 1),
    new Trashcan(1, 1, 1, false, new Point(50.6087179, 3.1350745), 'empty', 1),
    new Trashcan(1, 1, 2, false, new Point(50.6077179, 3.1390745), 'empty', 1),
    new Trashcan(1, 1, 3, false, new Point(50.6217179, 3.1388745), 'empty', 1),
    new Trashcan(1, 1, 4, false, new Point(50.6157179, 3.1399745), 'empty', 1),
    new Trashcan(1, 2, 1, false, new Point(50.6257179, 3.1313745), 'empty', 1),
    new Trashcan(1, 1, 2, false, new Point(50.6037179, 3.1364745), 'empty', 1),
    new Trashcan(1, 1, 3, false, new Point(50.6127179, 3.1350745), 'empty', 1),
    new Trashcan(1, 1, 4, false, new Point(50.6157179, 3.1312745), 'empty', 1),
  ]

  filterIsRunning: boolean = false;
  loading;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public translateService: TranslateService, public geolocation: Geolocation
    , public loadingCtrl: LoadingController, public trashcanService: TrashcanService) {

  }

  ionViewDidLoad() {
    console.log("Hello Tabz");
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
      let latLng = new google.maps.LatLng(myPosition.lat, myPosition.lon);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.dismissLoading();
      this.loadMarkers(myPosition);
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

  loadMarkers(myPosition: Point) {
    //TODO : implement this
    this.trashcanService.getTrashcans(myPosition).subscribe((res) => {
      this.markers = res;
      for (let marker of this.markers) {
        this.addMarker(marker.coordinates);
      }
    });
    //TODO : remove this when service is implemented
    for (let marker of this.markers) {
      this.addMarker(marker.coordinates);
    }
  }

  addMarker(coordinates: Point) {
    console.log(this.map.getCenter());
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: { lat: coordinates.lat, lng: coordinates.lon }
    })
  }

  /*
  presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 5000);
}*/
}