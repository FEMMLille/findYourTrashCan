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

  filterIsRunning: boolean = false;
  loading;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public translateService: TranslateService, public geolocation: Geolocation
    , public loadingCtrl: LoadingController) {

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
      console.log(position);
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //let latLng = new google.maps.LatLng(-40, 40);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
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