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
    actualWidth = window.innerWidth;
    isLoaded = false;

    constructor(
        private brandService: BrandsService,
        private categoryService: CategoriesService,
        private productService: ProductsService,
        public global: GlobalService,
        private router: Router) {}

    /* Screens */
    public bigScreen() {
        if (this.actualWidth > 1028) {
            return true;
        }
        return false;
    }

    public smallScreen() {
        if (this.actualWidth < 768) {
            return true;
        }
        return false;
    }

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
    }

    /* Get products + filter */
    getProducts() {
        this.productService.get().subscribe(response => {
            this.productList = response.object;
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
    goToCategory(slug) {
        this.router.navigate(['/kategorija/' + slug]);
    }

}
