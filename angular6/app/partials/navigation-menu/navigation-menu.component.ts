import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'px-navigation-menu',
    templateUrl: './navigation-menu.component.html',
    styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

    navItemsVisible = false;
    actualWidth = window.innerWidth;

    constructor() {}

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.actualWidth = event.target.innerWidth;
    }

    ngOnInit() {
        if (this.actualWidth > 768) {
            this.navItemsVisible = true;
        }
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

    /* Toggle Lists */
    toggleList() {
        this.navItemsVisible = !this.navItemsVisible;
    }
}
