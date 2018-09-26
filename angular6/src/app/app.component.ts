import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'px-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ElectroVision';

    constructor(private router: Router ) {}

    isAdminPanel = false;

    ngOnInit() {
        this.router.events.subscribe( evt => {
            const pathArray = window.location.pathname.split('/');
            const firstPath = pathArray[1];
            if (firstPath === 'admin') {
                this.isAdminPanel = true;
            } else {
                this.isAdminPanel = false;
            }
        });
    }
}
