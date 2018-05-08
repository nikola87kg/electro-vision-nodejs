/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* RxJs */
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
    constructor(private http: HttpClient) {}

    baseUrl = 'http://localhost:3000/api';

    /* GET brands */
    get() {
        return this.http.get(this.baseUrl + '/brands');
    }

    getBySlug(slug) {
        const URL = this.baseUrl + '/brands/' + slug;
        return this.http.get(URL);
    }

    /* POST brands */
    post(payload) {
        return this.http.post(this.baseUrl + '/brands', payload);
    }

    /* PUT brands */
    put(id, payload) {
        return this.http.put(this.baseUrl + '/brands/' + id, payload);
    }

    /* DELETE brands */
    delete(id) {
        return this.http.delete(this.baseUrl + '/brands/' + id);
    }
}
