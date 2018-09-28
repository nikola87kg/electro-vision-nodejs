import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalService } from '../../_services/global.service';
import { Router } from '@angular/router';

@Component({
    selector: 'px-navigation-menu',
    templateUrl: './navigation-menu.component.html',
    styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
    navItemsVisible = false;
    actualWidth = window.innerWidth;

    navItems = [
        { id: 1, name: 'Početna', link: '/pocetna', icon: 'home' },
        { id: 2, name: 'Proizvodi', link: '/kategorije', icon: 'layers' },
        { id: 3, name: 'Kontakt', link: '/kontakt', icon: 'phone' },
        { id: 4, name: 'Cenovnik', link: '/cenovnik', icon: 'assignment' },
        { id: 5, name: 'Galerija', link: '/galerija', icon: 'photo_library' },
        // { id: 5, name: 'Servis', link: '/servis', icon: 'build' },
        // { id: 7, name: 'O nama', link: '/o-nama', icon: 'assignment_ind' }
    ];

    @HostListener('window:resize', ['$event']) onResize(event) {
        this.actualWidth = event.target.innerWidth;
    }

    constructor(
        public global: GlobalService,
        private router: Router
    ) {}


    ngOnInit() {
    }

    /* Toggle Lists */
    toggleList() {
        this.navItemsVisible = !this.navItemsVisible;
    }


    openNewTab(link) {
        window.open(link);
    }
}
