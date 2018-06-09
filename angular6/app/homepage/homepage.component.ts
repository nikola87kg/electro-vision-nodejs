/* Angular */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

/* Services */
import { BrandsService } from 'angular6/app/_services/brands.service';
import { CategoriesService } from 'angular6/app/_services/categories.service';
import { ProductsService } from 'angular6/app/_services/products.service';
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
    listMobile = false;
    brandsMobile = true;
    categoryMobile = false;

    constructor(
        private brandService: BrandsService,
        private categoryService: CategoriesService,
        private productService: ProductsService,
        public global: GlobalService,
        private router: Router) {}

    /* INIT */
    ngOnInit() {
        this.getBrands();
        this.getCategories();
        this.getProducts();
    }

    /* Get products + filter */
    getProducts(categoryFilter?, groupFilter?, brandFilter?) {
        this.productService.get().subscribe(response => {
            let productsResponse: any = {
                message: '',
                object: {}
            };
            productsResponse = response;
            this.productList = productsResponse.object;
        });
    }

    /* Get brand */
    getBrands() {
        this.brandService.get().subscribe(result => {
            let brandsResponse: any = {
                message: '',
                object: {}
            };
            brandsResponse = result;
            this.brandList = brandsResponse.object;
        });
    }

    /* Get category */
    getCategories() {
        this.categoryService.get().subscribe(result => {
            let categoriesResponse: any = {
                message: '',
                object: {}
            };
            categoriesResponse = result;
            this.categoryList = categoriesResponse.object;
        });
    }

    /* Navigation */
    goToBrand(slug) {
        this.router.navigate(['/brend/' + slug]);
    }

    /* Toggle Lists */
    toggleList() {
        this.listMobile = !this.listMobile;
    }

    toggleBrands() {
        this.brandsMobile = !this.brandsMobile;
    }

    toggleCategories() {
        this.categoryMobile = !this.categoryMobile;
    }
}
