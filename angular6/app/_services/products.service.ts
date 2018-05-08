/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* RxJs */
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    constructor(private http: HttpClient) {}

    baseUrl = 'http://localhost:3000/api';

    /* GET Products */
    get() {
      return this.http.get(this.baseUrl + '/products');
    }

    getBySlug(slug) {
        const URL = this.baseUrl + '/products/' + slug;
        return this.http.get(URL);
    }

    /* POST Products */
    post(payload) {
        return this.http.post(this.baseUrl + '/products', payload);
    }

    /* PUT Products */
    put(id, payload) {
        return this.http.put(this.baseUrl + '/products/' + id, payload);
    }

    /* DELETE Products */
    delete(id) {
        return this.http.delete(this.baseUrl + '/products/' + id);
    }
}
