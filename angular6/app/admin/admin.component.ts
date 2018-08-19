import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'px-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent  {

    actualWidth = window.innerWidth;

    constructor() { }

    wideMenu = localStorage.getItem('sidebarOpen') || 'closed';

    togleMenu() {
        const sidebar = localStorage.getItem('sidebarOpen');
        if (sidebar === 'open') {
            localStorage.setItem('sidebarOpen', 'closed');
            this.wideMenu = 'closed';
        } else {
            localStorage.setItem('sidebarOpen', 'open');
            this.wideMenu = 'open';
        }
    }

    /* Screens */
    public smallScreen() {
        if (this.actualWidth < 768) {
            return true;
        }
        return false;
    }

}
