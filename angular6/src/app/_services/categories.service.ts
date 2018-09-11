/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.baseUrl;

    /* GET categories */
    get() {
        return this.http.get<{message: string, object}>(this.baseUrl + '/categories');
    }

    getBySlug(slug) {
    const URL = this.baseUrl + '/categories/' + slug;
        return this.http.get<{message: string, object}>(URL);
    }

    /* POST categories */
    post(payload) {
        return this.http.post(this.baseUrl + '/categories', payload);
    }

    /* PUT categories */
    put(id, payload) {
        return this.http.put(this.baseUrl + '/categories/' + id, payload);
    }

    /* DELETE categories */
    delete(id) {
        return this.http.delete(this.baseUrl + '/categories/' + id);
    }

    /* POST Category Image */
    postImage(id, file) {
        return this.http.post<any>(this.baseUrl + '/categories/images/' + id, file);
    }
}
