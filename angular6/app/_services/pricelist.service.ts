/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PricelistService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    /* GET Pricelist */
    get() {
      return this.http.get<{message: string, object}>(this.baseUrl + '/pricelist');
    }

    /* POST Pricelist */
    post(payload) {
        return this.http.post<{title, success, data}>(this.baseUrl + '/pricelist', payload);
    }

    /* PUT Pricelist */
    put(id, payload) {
        return this.http.put<{title, success, id}>(this.baseUrl + '/pricelist/' + id, payload);
    }

    /* DELETE Pricelist */
    delete(id) {
        return this.http.delete<{title, success, data}>(this.baseUrl + '/pricelist/' + id);
    }

}
