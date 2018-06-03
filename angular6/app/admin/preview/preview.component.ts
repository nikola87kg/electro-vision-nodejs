import { Component, OnInit } from '@angular/core';

/* Services */
import { BrandsService } from 'angular6/app/_services/brands.service';
import { CategoriesService } from 'angular6/app/_services/categories.service';
import { ProductsService } from 'angular6/app/_services/products.service';
import { GroupsService } from 'angular6/app/_services/groups.service';

@Component({
    selector: 'px-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
    productList = [];
    brandList = [];
    groupList = [];
    categoryList = [];

    constructor(
        private brandService: BrandsService,
        private categoryService: CategoriesService,
        private productService: ProductsService,
        private groupService: GroupsService
    ) {}

    ngOnInit() {
        this.getBrands();
        this.getCategories();
        this.getProducts();
        this.getGroups();
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

    /* Get categories */
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

    /* Get groups */
    getGroups() {
        this.groupService.get().subscribe(result => {
            let groupsResponse: any = {
                message: '',
                object: {}
            };
            groupsResponse = result;
            this.groupList = groupsResponse.object;
        });
    }
}
