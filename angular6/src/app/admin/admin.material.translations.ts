import {MatPaginatorIntl} from '@angular/material';
export class MatPaginatorIntlSerb extends MatPaginatorIntl {
  itemsPerPageLabel = 'Rezultata po stranici';
  nextPageLabel     = 'Sledeća stranica';
  previousPageLabel = 'Prethodna stranica';
  firstPageLabel     = 'Prva stranica';
  lastPageLabel = 'Poslednja stranica';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 od ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' od ' + length;
  };

}
