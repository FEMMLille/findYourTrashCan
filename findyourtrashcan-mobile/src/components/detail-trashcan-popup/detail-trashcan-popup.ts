import { Component,Input, Output, SimpleChanges, EventEmitter } from '@angular/core';


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
  
    
  @Input()
  show: boolean;

  showDetailTrashcanPopup: boolean = true;

  constructor(){}

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['show']) {
      this.showDetailTrashcanPopup = !this.showDetailTrashcanPopup;
    }
  }

  @Output()
  error = new EventEmitter();

}