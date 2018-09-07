import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';


@Component({
    selector: 'px-snackbar-component',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  actionWord = '';
  typeWord = '';

  ngOnInit() {
    this.switchActions();
    this.switchTypes();
  }

  switchActions() {
    switch (this.data.action) {
      case 'create':
        this.actionWord = 'sačuvan';
        break;
      case 'create2':
        this.actionWord = 'sačuvana';
        break;
      case 'update':
      this.actionWord = 'ažuriran';
        break;
      case 'update2':
      this.actionWord = 'ažurirana';
        break;
        case 'delete':
        this.actionWord = 'izbrisan';
          break;
        case 'delete2':
        this.actionWord = 'izbrisana';
          break;
      default:
      this.actionWord = 'obrađen';
    }
  }

  switchTypes() {
    switch (this.data.type) {
      case 'product':
        this.typeWord = 'Proizvod';
        break;
      case 'brand':
      this.typeWord = 'Brend';
        break;
      case 'group':
      this.typeWord = 'Potkategorija';
        break;
      case 'category':
      this.typeWord = 'Kategorija';
        break;
      case 'image':
      this.typeWord = 'Slika';
        break;
      case 'gallery':
      this.typeWord = 'Slika galerije';
        break;
      default:
      this.typeWord = 'Podatak';
    }
  }
}
