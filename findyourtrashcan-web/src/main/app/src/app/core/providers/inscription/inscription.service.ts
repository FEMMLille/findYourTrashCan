import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../logger/logger.service';
import { of } from 'rxjs/observable/of';

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

    constructor(private http: HttpClient) { }

    sendForm(contex: InscriptionContext): Observable<InscriptionContext> {
        return of();
    }
}
