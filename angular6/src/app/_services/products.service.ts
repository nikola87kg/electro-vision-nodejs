/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    /* GET Products */
    get() {
      return this.http.get<{message: string, object}>(this.baseUrl + '/products');
    }

    getBySlug(slug) {
        const URL = this.baseUrl + '/products/' + slug;
        return this.http.get<{message: string, object}>(URL);
    }

    /* POST Products */
    post(payload) {
        return this.http.post<{title, success, data}>(this.baseUrl + '/products', payload);
    }

    /* PUT Products */
    put(id, payload) {
        return this.http.put<{title, success, id}>(this.baseUrl + '/products/' + id, payload);
    }

    /* DELETE Products */
    delete(id) {
        return this.http.delete<{title, success, data}>(this.baseUrl + '/products/' + id);
    }

    /* POST Product Image */
    postImage(id, file) {
        return this.http.post<any>(this.baseUrl + '/products/images/' + id, file);
    }
}
