import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from 'angular6/app/_services/products.service';

declare var $: any;

@Component({
  selector: 'px-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  showResult = false;
  searchInput = '';
  resultsSorted = [];

  ngOnInit() {
    setTimeout(() => { this.getProductsSearch(); }, 1);
  }

  /* Show result list */

  clearSearch() {
    this.searchInput = '';
  }

  toggleResults() {
    this.showResult = !this.showResult;
  }

  showResults() {
    if (this.searchInput.length > 0) {
      this.showResult = true;
    } else {
      this.showResult = false;
    }
  }

  hideResults() {
    this.showResult = false;
  }


  /* Get products + filter */

  getProductsSearch() {
    this.productService.get().subscribe(response => {
      // const res = response;
      /* sort array of objects */
      // res.sort(function(a, b) {
      //   const nameA = a.name.toLowerCase();
      //   const nameB = b.name.toLowerCase();
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }
      //   return 0;
      // });
      // this.resultsSorted = res;
    });
  }

  goToProducts(search) {
    this.showResult = false;
    this.clearSearch();
    this.router.navigate(['/proizvodi']);
  }

  /* Navigation on click */

  navigator(slug) {
    this.showResult = false;
    this.searchInput = '';
    this.router.navigate(['/proizvodi/' + slug]);
  }
}
