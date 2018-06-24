import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../_services/products.service';
import { CategoriesService } from '../../_services/categories.service';
import { GroupsService } from '../../_services/groups.service';
import { Router } from '@angular/router';

@Component({
    selector: 'px-products-all',
    templateUrl: './products-all.component.html',
    styleUrls: ['./products-all.component.scss']
})
export class ProductsAllComponent implements OnInit {
    productList = [];
    categoryList = [];
    isLoaded = false;

    constructor(
        public productService: ProductsService,
        public groupService: GroupsService,
        public categorytService: CategoriesService,
        private router: Router
    ) {}

    ngOnInit() {
        setTimeout(() => {
            this.getCategories();
            this.onLoad();
        }, 1);
    }

    onLoad() {
        this.isLoaded = true;
    }

    /* Get categories*/
    getCategories() {
        this.categorytService.get().subscribe(response => {
            this.categoryList = response.object;
            this.categoryList.forEach(
                category => {
                    category = this.getGroups(category);
                }
            );
        });
    }

    /* Get groups by Category */
    getGroups(dynamicCategory) {
        this.groupService.get().subscribe(response => {
            const groupArray =  response.object.filter(
                group => group.category.name === dynamicCategory.name
            );
            dynamicCategory.groups = groupArray;
            dynamicCategory.groups.forEach(
                group => {
                    group = this.getProducts(group);
                }
            );
            return dynamicCategory;
        });
    }

    /* Get products by Group */
    getProducts(dynamicGroup) {
        this.productService.get().subscribe(response => {
            const prodArray =  response.object.filter(
                product => product.group.name === dynamicGroup.name
            );
            dynamicGroup.products = prodArray;
            return dynamicGroup;
        });
    }


    /* Navigation */
    goToGroup(slug) {
        this.router.navigate(['/potkategorija/' + slug]);
    }
    goToProduct(slug) {
        this.router.navigate(['/proizvod/' + slug]);
    }
    goToCategory(slug) {
        this.router.navigate(['/kategorija/' + slug]);
    }
}
