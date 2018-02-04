import { Component,OnChanges,SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DetailPopupService } from '../../providers/detailpopup/detailpopup';

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

  
  public openPopup: boolean = false; 

  constructor(public translateService: TranslateService, public detailPopupService: DetailPopupService){
    this.detailPopupService.showViewObservable().subscribe((bool: boolean) =>{
      this.openPopup = bool;
      console.log(this.openPopup);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
   console.log(changes); 
    
  }


}