import { Component, Input, SimpleChanges,Output, EventEmitter } from '@angular/core';
import { TrashcanService } from './../../providers/trashcan/trashcan';
import { Location } from './../../shared/model/location';
import { Trashcan } from '../../shared/model/trashcan';
import { TrashcanType } from '../../shared/model/trashcan-type';
import { GarbageType } from '../../shared/model/garbage-type';
import { TrashcanTypeService } from '../../providers/trashcan/trashcan-type';
import { GarbageTypeService, AuthenticationService } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the FilterTrashcanPopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter-trashcan-popup',
  templateUrl: 'filter-trashcan-popup.html',
})
export class FilterTrashcanPopupComponent {
  fakeGreen: boolean = false;
  showFilterTrashcanPopup: boolean = false;
  filteredTrashcan: Trashcan = new Trashcan();
  trashcanTypes: Array<TrashcanType> = [];
  garbageTypes: Array<GarbageType> = [];
  private chooseGarbageType: string;
  private cancelLabel: string;
  private pleaseWait: string;
  private noNetwork: string;
  private pleaseRetry: string;

  disconnected: boolean;
  listSelectedGarbageType: string = '...';

  constructor(public trashcanTypeService: TrashcanTypeService, public garbageTypeService: GarbageTypeService,
    public translateService: TranslateService, public actionSheetCtrl: ActionSheetController, public network: Network,
    public trashcanService: TrashcanService, public geolocation: Geolocation,
  public auth: AuthenticationService, public toastCtrl: ToastController) {

    /**
     * Getting the trashcan type values from webservices
     */
    this.trashcanTypeService.get().subscribe((values) => {
      console.log(values);
      this.trashcanTypes = values;
    });
    /**
     * Getting the garbage type values from webservices
     */
    this.garbageTypeService.get().subscribe((values) => {
      console.log(values);
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
    this.filteredTrashcan.empty = true;
    this.filteredTrashcan.garbageType = new GarbageType(1);
    this.filteredTrashcan.picture = "";
    this.filteredTrashcan.trashcanType = new TrashcanType(1);
    this.filteredTrashcan.location = new Location(59000);
  }

  @Input() showFilter: boolean;

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showFilter']) {

      this.showFilterTrashcanPopup = this.showFilter;

      if(!this.showFilterTrashcanPopup && this.fakeGreen) {
        this.showFilterGreen.emit(false);
        this.fakeGreen = false;
      }

    }
  }

/**
   * A function that handles updates on the trashcan types
   * @param id the id of the trashcan type
   */
  updateFilteredTrashcanType(id: number) {
    this.filteredTrashcan.trashcanType = new TrashcanType(id);
  }

  /**
   * A function that handles updates on the garbage types
   * @param id the id of the garbage type
   */
  updateFilteredTrashcanGarbage(id: number) {
    this.filteredTrashcan.garbageType = new GarbageType(id);
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
    this.updateFilteredTrashcanGarbage(id);
    this.listSelectedGarbageType = label;
  }

  /**
   * A function calling the proper webervice to filter trashcans
   */
  filterTrashcan() {
    if (!this.disconnected) {
      this.trashcanService.filterTrashcan(this.filteredTrashcan).subscribe((res) => {
        this.filtered.emit(res);
        this.showFilterTrashcanPopup = false;
        this.fakeGreen = true;
        this.showFilterGreen.emit(true);
        this.trashcanService.hasSearched = true;

      }, (err) => {
        this.error.emit(this.pleaseRetry);
      });
      this.added.emit(false);
    } else {
      this.error.emit(this.noNetwork + '.  ' + this.pleaseRetry);
    }
  }

  setFavoriteSearch(trashcan: Trashcan) {
    if (!this.disconnected) {
      this.trashcanService.setFavoriteSearch(this.filteredTrashcan).subscribe((res) => {
        this.auth.getCurrentUser().favoriteSearch = this.filteredTrashcan;
        let toast = this.toastCtrl.create({
          message: "Recherche favorite sauvegardée cliquez sur le bouton de recherche rapide !",
          duration: 3000,
          position: 'bottom',
          dismissOnPageChange: true
        });
        toast.present();
        this.added.emit("true");
        this.dismissFilterPopup();
      }, (err) => {
        this.error.emit(this.pleaseRetry);
      });
      this.added.emit(false);
    } else {
      this.error.emit(this.noNetwork + '.  ' + this.pleaseRetry);
    }
  }

  dismissFilterPopup() {
    this.showFilterTrashcanPopup = false;
  }

  @Output()
  error = new EventEmitter();

  @Output()
  added = new EventEmitter();

  @Output()
  filtered = new EventEmitter();

  @Output() showFilterGreen = new EventEmitter();

}
