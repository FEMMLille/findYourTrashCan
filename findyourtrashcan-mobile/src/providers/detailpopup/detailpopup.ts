import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DetailPopupService {

    showView  = new Subject<boolean>();

    constructor() {}

    showViewObservable():Observable<boolean>{
        return this.showView.asObservable();
    }
  
    subscribeShow(bool: boolean){
        this.showView.next(bool);
    }

    unsubscribeShow(){
        this.showView.next();
    }
}
