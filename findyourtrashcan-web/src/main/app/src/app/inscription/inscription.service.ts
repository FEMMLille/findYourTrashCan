import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../core/logger.service';

const log = new Logger('InscriptionService');

export interface InscriptionContext {
    login: string;
    password: string;
    repeatPassword: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: boolean;
}

@Injectable()
export class InscriptionService {

    constructor(private http: Http) { }

    sendForm(contex: InscriptionContext): Observable<InscriptionContext> { 
        return Observable.of();
    }
}
