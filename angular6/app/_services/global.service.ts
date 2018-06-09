import { Injectable, HostListener } from '@angular/core';

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
