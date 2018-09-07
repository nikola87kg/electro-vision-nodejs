/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GalleryService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    /* GET Gallery */
    get() {
      return this.http.get<{message: string, object}>(this.baseUrl + '/gallery');
    }

    /* POST Gallery */
    post(payload) {
        return this.http.post<{title, success, data}>(this.baseUrl + '/gallery', payload);
    }

    /* PUT Gallery */
    put(id, payload) {
        return this.http.put<{title, success, id}>(this.baseUrl + '/gallery/' + id, payload);
    }

    /* DELETE Gallery */
    delete(id) {
        return this.http.delete<{title, success, data}>(this.baseUrl + '/gallery/' + id);
    }

    /* POST Gallery Image */
    postImage(id, file) {
        return this.http.post<any>(this.baseUrl + '/gallery/images/' + id, file);
    }
}
