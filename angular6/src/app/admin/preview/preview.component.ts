import { Component, OnInit } from '@angular/core';

/* Services */
import { BrandsService } from '../../_services/brands.service';
import { CategoriesService } from '../../_services/categories.service';
import { ProductsService } from '../../_services/products.service';
import { GroupsService } from '../../_services/groups.service';

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
    displayedColumns: string[] = ['name', 'created'];

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
            this.productList = response.object;
        });
    }

    /* Get brand */
    getBrands() {
        this.brandService.get().subscribe(response => {
            this.brandList = response.object;
        });
    }

    /* Get categories */
    getCategories() {
        this.categoryService.get().subscribe(response => {
            this.categoryList = response.object;
        });
    }

    /* Get groups */
    getGroups() {
        this.groupService.get().subscribe(response => {
            this.groupList = response.object;
        });
    }
}
