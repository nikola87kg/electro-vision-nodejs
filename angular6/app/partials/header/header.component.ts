import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from 'angular6/app/_services/products.service';
import { GlobalService } from '../../_services/global.service';

declare var $: any;

@Component({
    selector: 'px-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(
        private productService: ProductsService,
        private router: Router,
        public global: GlobalService
    ) {}

    showResult = false;
    searchInput = '';
    resultsSorted = [];

    ngOnInit() {
        setTimeout(() => {
            this.getProductsSearch();
        }, 1);
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
            /* sort array of objects */
            response.object.sort(function(a, b) {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            this.resultsSorted = response.object;

        });
    }

    goToProducts() {
        this.showResult = false;
        this.clearSearch();
        this.router.navigate(['/proizvodi']);
    }

    /* Navigation on click */

    goToProduct(slug) {
        this.showResult = false;
        this.searchInput = '';
        this.router.navigate(['/proizvod/' + slug]);
    }
}
