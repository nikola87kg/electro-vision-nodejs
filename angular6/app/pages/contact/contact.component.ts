import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'px-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    lat = 51.678418;
    lng = 7.809007;

    constructor() {}

    ngOnInit() {}
}
