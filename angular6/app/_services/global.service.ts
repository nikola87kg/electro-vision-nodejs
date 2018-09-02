import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class GlobalService {
    constructor() {}

    actualWidth = window.innerWidth;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.actualWidth = event.target.innerWidth;
    }

    // const windowSize = new BehaviorSubject('wide');

    /* Screens */
    public bigScreen() {
        if (this.actualWidth > 1028) {
            return true;
        }
        return false;
    }

    public smallScreen() {
        if (this.actualWidth < 768) {
            return true;
        }
        return false;
    }
}
