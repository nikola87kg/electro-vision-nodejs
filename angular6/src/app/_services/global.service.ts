import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class GlobalService {
    constructor() {}

    windowSize = new BehaviorSubject('small');

}
