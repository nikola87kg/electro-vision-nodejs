import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'px-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

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

  ngOnInit() {
  }

}
