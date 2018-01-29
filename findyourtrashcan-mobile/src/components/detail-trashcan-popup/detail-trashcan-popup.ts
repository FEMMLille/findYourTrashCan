import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AddTrashcanPopupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'detail-trashcan-popup',
    templateUrl: 'detail-trashcan-popup.html'
})

export class DetailTrashcanPopupComponent {

  showDetailTrashcanPopup: boolean = false;

  constructor(public translateService: TranslateService){
   
  }
  @Input()
  show: boolean;

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['show']) {
      this.showDetailTrashcanPopup = !this.showDetailTrashcanPopup;
      console.log(this.showDetailTrashcanPopup);
    }
  }

  @Output()
  error = new EventEmitter();

}