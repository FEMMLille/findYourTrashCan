import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = '/api/back';
  token: string;

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    var headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get(this.url + '/' + endpoint, { headers: headers });
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    var headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.post(this.url + '/' + endpoint, body, { headers: headers });
  }

  postNoToken(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    var headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.put(this.url + '/' + endpoint, body, { headers: headers });
  }
  
  delete(endpoint: string, reqOpts?: any) {
    var headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.delete(this.url + '/' + endpoint, { headers: headers });
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    var headers = new HttpHeaders({ 'Authorization': this.token });
    return this.http.put(this.url + '/' + endpoint, body, { headers: headers });
  }

  getGeolocationStreet(lat:number, lon:number){
   return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&key=AIzaSyB9k1slfRsMptrUKzKL4JmLhcCHNE5W2Iw');
  }
}
