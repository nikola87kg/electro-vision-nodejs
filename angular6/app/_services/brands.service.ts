/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.baseUrl;

    /* GET brands */
    get() {
        return this.http.get<{message: string, object}>(this.baseUrl + '/brands');
    }

    getBySlug(slug) {
        const URL = this.baseUrl + '/brands/' + slug;
        return this.http.get<{message: string, object}>(URL);
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
    /* POST Brand Image */
    postImage(id, file) {
        return this.http.post<any>(this.baseUrl + '/brands/images/' + id, file);
    }
}
