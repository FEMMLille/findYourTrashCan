import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const routes = {
    communesByPostalCode: (c: FieldsContext) => `/geo/communes?codePostal=${c.postalCode}`,
    communesByNames: (c: FieldsContext) => `/geo/communes?nom=${c.name}`
};
const customReturnedFields = {
    name: `nom`,
    postalCode: 'codesPostaux',
    department: `departement`,
    region: `region`
};

const fields = `&fields=`;
const format = `&format=json`;

export interface FieldsContext {
    postalCode: number;
    name: string;
}

@Injectable()
export class LocationService {

    constructor(private http: Http) { }

    searchCityByPostalCode(postalCode: FieldsContext): Observable<JSON> {
        return this.http
            .get(routes.communesByPostalCode(postalCode) + fields + customReturnedFields.name + format, { cache: true })
            .map(response => response.json());
    }
}
