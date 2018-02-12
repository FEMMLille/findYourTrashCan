import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Trashcan } from '../../shared/model/trashcan';

@Injectable()
export class DetailPopupService {

    showView  = new Subject<boolean>();
    trashcan: Trashcan;

    constructor() {}

    showViewObservable():Observable<boolean>{
        return this.showView.asObservable();
    }
  
    subscribeShow(bool: boolean, trashcan: Trashcan){
        this.trashcan = trashcan;
        this.showView.next(bool);
    }

    unsubscribeShow(){
        this.showView.next();
    }

    get currentTrashcan(): Trashcan{
        return this.trashcan;
    }

}
