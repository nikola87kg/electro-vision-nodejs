import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'px-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  constructor() { }

  wideMenu = true;

  togleMenu() {
    this.wideMenu = !this.wideMenu;
  }

  ngOnInit() {
  }

}
