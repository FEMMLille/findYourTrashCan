import { TrashcanService } from './../../providers/trashcan/trashcan'
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';
import { Component, ViewChild, Input, Output, ElementRef, EventEmitter, SimpleChanges, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Point } from '../../shared/model/point';
import { Trashcan } from '../../shared/model/trashcan';
import { MapBounds } from '../../shared/model/map-bounds';
import { DetailPopupService } from '../../providers/detailpopup/detailpopup';

/**
 * Generated class for the GoogleMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var google;

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  directionsService: any;
  directionsDisplay: any;
  trashcans: Array<Trashcan> = [];
  maxBounds: MapBounds;
  private noNetwork: string;
  private pleaseRetry: string;
  private directionsRequestFailed: string;
  private internalErrorFindingTrashcans: string;
  mapLoaded = false;
  disconnected: boolean = false;


  constructor(public geolocation: Geolocation,
    public translateService: TranslateService,
    public network: Network,
    public trashcanService: TrashcanService,
    public popupService: DetailPopupService) {

    /**
     * Getting translations from service
     */
    this.translateService.get('NO_NETWORK').subscribe((value) => {
      this.noNetwork = value;
    });

    this.translateService.get('PLEASE_RETRY').subscribe((value) => {
      this.pleaseRetry = value;
    });

    this.translateService.get('INTERNAL_ERROR_FIND_TRASHCANS').subscribe((value) => {
      this.internalErrorFindingTrashcans = value;
    });

    this.translateService.get('DIRECTIONS_REQUEST_FAILED').subscribe((value) => {
      this.directionsRequestFailed = value;
    });
  }

  ngOnInit() {
    /**
     * Handle network troubles
     */
    this.network.onDisconnect().subscribe(() => {
      this.disconnected = true;
    });

    /**
     * When we're connected back, if the map was not already loaded we try again
     */
    this.network.onConnect().subscribe(() => {
      this.disconnected = false;
      if (!this.mapLoaded)
        this.loadMap();
    });
    //First map loading
    this.loadMap();
  }

  /**
   * Load google map
   */
  loadMap() {
    //We notify the host page that we are loading
    this.load.emit(true);
    // We get the location of the user
    this.geolocation.getCurrentPosition().then((position) => {
      let myPosition = new Point(position.coords.latitude, position.coords.longitude)
      let mapOptions = {
        center: new google.maps.LatLng(myPosition.lat, myPosition.lon),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.trashcans = [];
      //We intialize the service and display of te directionss
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;
      //We initialize the map
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.directionsDisplay.setMap(this.map);
      //We set the max bounds
      this.maxBounds = new MapBounds(new Point(myPosition.lat + 5, myPosition.lon + 3), new Point(myPosition.lat - 5, myPosition.lon - 3));
      //We set a listener whenever the map idles (after a zoom or a swipe) to load trashcans in the new bounds
      this.map.addListener('idle', () => {
        this.loadTrashcans(this.getMapBounds());
      });
      // We notify the host page that we finished loading
      this.load.emit(false);
      //We keep the information that the map is loaded
      this.mapLoaded = true;

    }, (err) => {
      this.error.emit(this.noNetwork + '. ' + this.pleaseRetry);
    });
  }

  /**
   * Get the map bounds to reload trashcans
   */
  getMapBounds(): MapBounds {
    let bounds = this.map.getBounds();
    let ne = new Point(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
    let sw = new Point(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());
    let mb = new MapBounds(ne, sw);
    return mb;
  }

  /**
   * A function used to load all trahcans in the visible map
   * @param mapBounds the bounds of the map
   */
  loadTrashcans(mapBounds: MapBounds) {
    this.popupService.subscribeShow(false, null);
    var i = 1; // A variable used to smoothe the trashcans animations
    if (!this.disconnected) {
      //We call the webservice
      this.trashcanService.getTrashcans(this.chooseBounds(mapBounds)).subscribe((res) => {
        for (let trashcan of res) {
          //We don't do anything if the trashcan is already in the array
          if (this.checkTrashcanArraysContains(trashcan)) {
            break;
          } else {
            setTimeout(() => {
              //If we don't have it we add the trashcan
              this.renderTrashcan(trashcan);
            }, i * 200);
          }
          i++;
        }
      }, (err) => {
        this.error.emit(this.internalErrorFindingTrashcans);
        console.log(err);
      });
    } else {
      this.error.emit(this.noNetwork + '.  ' + this.pleaseRetry);
    }
  }

  /**
  * A function used to know if we should use the map bound or the max bounds 
  * (in order to avoid to load all trashcans over the world)
  * @param mapBounds The bounds of the map
  */
  chooseBounds(mapBounds: MapBounds): MapBounds {
    let neLat = (mapBounds.northEast.lat > this.maxBounds.northEast.lat) ? this.maxBounds.northEast.lat : mapBounds.northEast.lat;
    let neLon = (mapBounds.northEast.lon > this.maxBounds.northEast.lon) ? this.maxBounds.northEast.lon : mapBounds.northEast.lon;
    let swLat = (mapBounds.southWest.lat < this.maxBounds.southWest.lat) ? this.maxBounds.southWest.lat : mapBounds.southWest.lat;
    let swLon = (mapBounds.southWest.lon < this.maxBounds.southWest.lon) ? this.maxBounds.southWest.lon : mapBounds.southWest.lon;
    return new MapBounds(new Point(neLat, neLon), new Point(swLat, swLon));
  }

  /**
   * A function used to test if a trashcan is in our trashcan array
   * @param testedTrashcan The trashcan we want to check
   */
  checkTrashcanArraysContains(testedTrashcan: Trashcan): boolean {
    for (let trashcan of this.trashcans) {
      if (trashcan.id == testedTrashcan.id)
        return true;
    }
    return false;
  }

  /**
   * A function used to render a single trashcan
   * @param trashcan The trashcan we want to render
   */
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
    /**
     * add listener of marker for show popup detail
     */
    marker.addListener('click', () => {
      this.openTrashcanDetails.emit(trashcan);
    });

    this.markers.push(marker);
  }
  /**
   * A function used to get the marker that simbolises a single trashcan
   * @param t the trashcan for which we attend to get the icon
   */
  getMarkerIcon(t: Trashcan) {
    let empty: string = t.empty ? '0' : '1';
    let path: string = '' + t.trashcanType.id + t.garbageType.id;
    return 'assets/img/icons/processed/' + empty + path + '.png';
  }

  /**
   * A function used to show the route to go to a trashcan
   * @param trashcan The trashcan where which we want to go to
   */
  showRouteTo(trashcan: Trashcan) {
    if (!this.disconnected) {
      // We get the location of the user
      this.geolocation.getCurrentPosition().then((position) => {
        let routeOrigin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let routeDestination = new google.maps.LatLng(trashcan.lat, trashcan.lon);

        this.directionsService.route({
          origin: routeOrigin,
          destination: routeDestination,
          travelMode: 'WALKING'
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            this.error.emit(this.directionsRequestFailed + status);
          }
        });
      });
    } else {
      this.error.emit(this.noNetwork + ". " + this.pleaseRetry);
    }
  }

  deleteMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    //Keep these console.logs or the markers will be drawn too much time
    console.log(this.markers);
    this.markers = [];
    console.log(this.markers);
  }

  @Input()
  newTrashcans: boolean;

  @Input()
  routeTrashcan: Trashcan;

  @Input()
  redrawMarkers: boolean;

  ngOnChanges(changes: SimpleChanges) {
    // only run when newTrashcans changed, if we have new trashcans we should reload the trashcans
    if (changes['newTrashcans']) {
      if (this.mapLoaded)
        this.loadTrashcans(this.getMapBounds());
      this.updated.emit(true);
    } else if (changes['routeTrashcan']) {
      this.showRouteTo(changes['routeTrashcan'].currentValue);
    } else if (changes['redrawMarkers']) {
      console.log("redrawMarkers");
      this.trashcans = [];
      this.deleteMarkers();
      this.loadTrashcans(this.getMapBounds());
    }
  }

  @Output()
  load = new EventEmitter();

  @Output()
  error = new EventEmitter();

  @Output()
  updated = new EventEmitter();

  @Output()
  openTrashcanDetails = new EventEmitter();




}
