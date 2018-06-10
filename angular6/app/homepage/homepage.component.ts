/* Angular */
import { Component, OnInit, HostListener } from '@angular/core';
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
    navItemsVisible = false;
    actualWidth = window.innerWidth;

    constructor(
        private brandService: BrandsService,
        private categoryService: CategoriesService,
        private productService: ProductsService,
        public global: GlobalService,
        private router: Router) {}


    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.actualWidth = event.target.innerWidth;
    }
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
    ngOnInit() {
        this.getBrands();
        this.getCategories();
        this.getProducts();
        if (this.actualWidth > 768) {
            this.navItemsVisible = true;
        }
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
    goToProduct(slug) {
        this.router.navigate(['/proizvod/' + slug]);
    }
    goToCategory(slug) {
        this.router.navigate(['/kategorija/' + slug]);
    }

    /* Toggle Lists */
    toggleList() {
        this.navItemsVisible = !this.navItemsVisible;
    }
}
