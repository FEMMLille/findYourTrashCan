import { RangService } from './../../providers/rang/rang';
import { TrashcanService } from './../../providers/trashcan/trashcan';
import { Location } from './../../shared/model/location';
import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Trashcan } from '../../shared/model/trashcan';
import { TrashcanType } from '../../shared/model/trashcan-type';
import { GarbageType } from '../../shared/model/garbage-type';
import { TrashcanTypeService } from '../../providers/trashcan/trashcan-type';
import { GarbageTypeService, AuthenticationService } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the AddTrashcanPopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-trashcan-popup',
  templateUrl: 'add-trashcan-popup.html'
})
export class AddTrashcanPopupComponent {

  addedTrashcan: Trashcan = new Trashcan();
  trashcanTypes: Array<TrashcanType> = [];
  garbageTypes: Array<GarbageType> = [];
  private chooseGarbageType: string;
  private cancelLabel: string;
  private pleaseWait: string;
  private noNetwork: string;
  private pleaseRetry: string;
  disconnected: boolean;
  showAddTrashcanPopup: boolean = true;
  listSelectedGarbageType: string = '...';

  constructor(public trashcanTypeService: TrashcanTypeService, public garbageTypeService: GarbageTypeService,
    public translateService: TranslateService, public actionSheetCtrl: ActionSheetController, public network: Network,
    public trashcanService: TrashcanService, public geolocation: Geolocation, public rankService: RangService,
    public auth: AuthenticationService) {

    /**
     * Getting the trashcan type values from webservices
     */
    this.trashcanTypeService.get().subscribe((values) => {
      this.trashcanTypes = values;
    });
    /**
     * Getting the garbage type values from webservices
     */
    this.garbageTypeService.get().subscribe((values) => {
      this.garbageTypes = values;
    });

    /**
     * Getting the translations from service
     */
    this.translateService.get('CHOOSE_GARBAGE_TYPE').subscribe((value) => {
      this.chooseGarbageType = value;
    });

    this.translateService.get('CANCEL_BUTTON').subscribe((value) => {
      this.cancelLabel = value;
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

    /**
     * Instanciating a new trashcan
     */
    this.addedTrashcan.empty = true;
    this.addedTrashcan.garbageType = new GarbageType(1);
    this.addedTrashcan.picture = "";
    this.addedTrashcan.trashcanType = new TrashcanType(1);
    this.addedTrashcan.location = new Location(59000);
  }

  ngOnInit() {
    /**
     * Manage network disconnections to avoid errors calling webservice while being offline
     */
    this.network.onDisconnect().subscribe(() => {
      this.disconnected = true;
    });

    this.network.onConnect().subscribe(() => {
      this.disconnected = false;
    });
  }

  /**
   * A function that handles updates on the trashcan types
   * @param id the id of the trashcan type
   */
  updateAddedTrashcanType(id: number) {
    this.addedTrashcan.trashcanType = new TrashcanType(id);
  }

  /**
   * A function that handles updates on the garbage types
   * @param id the id of the garbage type
   */
  updateAddedTrashcanGarbage(id: number) {
    this.addedTrashcan.garbageType = new GarbageType(id);
  }

  /**
   * A function that shows the action sheet (the sheet that shows the less frequent garbage types)
   * @param id the id of the trashcan type
   */
  showActionSheet() {
    let buttons: Array<any> = [];

    for (let type of this.garbageTypes) {
      //
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

  /**
   * 
   * @param id The id of the garbage type
   * @param label The label of the chosen garbage type (in order to change the last popup button label)
   */
  updateGarbageTypeFromActionSheet(id: number, label: string) {
    this.updateAddedTrashcanGarbage(id);
    this.listSelectedGarbageType = label;
  }

  /**
   * A function calling the proper webervice to add a trashcan
   * @param trashcan The trashcan that the user wants to add
   */
  addTrashcan(trashcan: Trashcan) {
    if (!this.disconnected) {
      this.geolocation.getCurrentPosition().then((position) => {
        this.addedTrashcan.lat = position.coords.latitude;
        this.addedTrashcan.lon = position.coords.longitude;
        this.trashcanService.addTrashcan(this.addedTrashcan, this.auth._rank.rangType.id >= 3).subscribe((res) => {
          this.added.emit("true");
        }, (err) => {
          this.error.emit(this.pleaseRetry);
        });
      }, (err) => {
        this.error.emit(this.pleaseRetry);
      });
      this.added.emit(false);
    } else {
      this.error.emit(this.noNetwork + '.  ' + this.pleaseRetry);
    }
  }

  @Input()
  show: boolean;

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['show']) {
      this.showAddTrashcanPopup = !this.showAddTrashcanPopup;
    }
  }

  @Output()
  error = new EventEmitter();

  @Output()
  added = new EventEmitter();

}
