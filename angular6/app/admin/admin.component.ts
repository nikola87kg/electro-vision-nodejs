import { Component, ViewEncapsulation, OnInit, HostListener } from '@angular/core';
import { GlobalService } from '../_services/global.service';

@Component({
  selector: 'px-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

    wideMenu = localStorage.getItem('sidebarOpen') || 'closed';
    windowSize = null;

    constructor( public global: GlobalService ) {}

    ngOnInit() {
        this.checkWidth();
        this.global.windowSize.next(this.windowSize);
    }

    @HostListener('window:resize', ['$event']) onResize(event) {
        const innerWidth = event.target.innerWidth;
        if (innerWidth > 1028) {
            this.windowSize = 'large';
        } else if (innerWidth > 768) {
            this.windowSize = 'medium';
        } else {
            this.windowSize = 'small';
        }
        this.global.windowSize.next(this.windowSize);
    }

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

    checkWidth() {
        const innerWidth = window.innerWidth;
        if (innerWidth > 1028) {
            this.windowSize = 'large';
        } else if (innerWidth > 768) {
            this.windowSize = 'medium';
        } else {
            this.windowSize = 'small';
        }
        this.global.windowSize.next(this.windowSize);
    }

}
