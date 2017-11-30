import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';


@Injectable()
export class TrashcanTypeService {

    constructor(public api: Api) { }

    getTrashcanType(id: number): Observable<any> {
        return this.api.get('trashcan-type/' + id);
    }
}