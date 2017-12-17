import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
    /*
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }*/

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
}
