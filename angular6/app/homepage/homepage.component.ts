/* Angular */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { BrandsService } from '../_services/brands.service';
import { CategoriesService } from '../_services/categories.service';
import { ProductsService } from '../_services/products.service';
import { GlobalService } from '../_services/global.service';

@Component({
    selector: 'px-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    productList = [];
    brandList = [];
    categoryList = [];
    navItemsVisible = false;
    windowSize;
    isLoaded = false;

    constructor(
        private brandService: BrandsService,
        private categoryService: CategoriesService,
        private productService: ProductsService,
        public global: GlobalService,
        private router: Router) {}

    /* INIT */
    onLoad() {
        this.isLoaded = true;
    }

    ngOnInit() {
        this.getBrands();
        this.getCategories();
        this.getProducts();
        setTimeout(() => {
            this.onLoad();
        }, 1);
        this.global.windowSize.subscribe(
            (result => this.windowSize = result)
        );
    }

    /* Get products + filter */
    getProducts() {
        this.productService.get().subscribe(response => {
            this.productList = response.object.filter(
                item => item.vip === true
            );
        });
    }

    /* Get brand */
    getBrands() {
        this.brandService.get().subscribe(response => {
            this.brandList = response.object;
        });
    }

    /* Get category */
    getCategories() {
        this.categoryService.get().subscribe(response => {
            this.categoryList = response.object;
        });
    }

    /* Navigation */
    goToBrand(slug) {
        this.router.navigate(['/brend/' + slug]);
    }
    goToProduct(slug) {
        this.router.navigate(['/proizvod/' + slug]);
    }
    goToCategory(id?) {
        if (id) {
            this.router.navigate(['/kategorije']);
        } else {
            this.router.navigate(['/kategorije']);
        }
    }

}
