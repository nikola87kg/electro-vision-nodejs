/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* RxJs */
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.baseUrl;

    /* GET groups */
    get() {
        return this.http.get<{message: string, object}>(this.baseUrl + '/groups');
    }

    getBySlug(slug) {
        const URL = this.baseUrl + '/groups/' + slug;
        return this.http.get<{message: string, object}>(URL);
    }

    /* POST groups */
    post(payload) {
        return this.http.post(this.baseUrl + '/groups', payload);
    }

    /* PUT groups */
    put(id, payload) {
        return this.http.put(this.baseUrl + '/groups/' + id, payload);
    }

    /* DELETE groups */
    delete(id) {
        return this.http.delete(this.baseUrl + '/groups/' + id);
    }

    /* POST Group Image */
    postImage(id, file) {
        return this.http.post<any>(this.baseUrl + '/groups/images/' + id, file);
    }
}
