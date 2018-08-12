import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../_services/products.service';
import { CategoriesService } from '../../_services/categories.service';
import { GroupsService } from '../../_services/groups.service';
import { Router } from '@angular/router';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
    selector: 'px-products-all',
    templateUrl: './products-all.component.html',
    styleUrls: ['./products-all.component.scss']
})
export class ProductsAllComponent implements OnInit {
    headline: string;
    isLoaded: Boolean;
    currentLevel: number;
    currentList: Array<any>;

    constructor(
        public productService: ProductsService,
        public groupService: GroupsService,
        public categorytService: CategoriesService,
        private router: Router
    ) {}

    ngOnInit() {
        this.currentLevel = 1;
        this.headline = 'Kategorije proizvoda';
        this.getCategories();
    }

    onLoadCompleted() {
        this.isLoaded = true;
    }

    onItemClick(id, slug) {
        this.currentLevel = this.currentLevel + 1;
        if ( this.currentLevel === 2 ) {
            this.headline = 'Grupe proizvoda';
            this.getGroups(id);
        } else if ( this.currentLevel === 3 ) {
            this.headline = 'Lista proizvoda';
            this.getProducts(id);
        } else if ( this.currentLevel === 4 ) {
            this.goToProduct(slug);
        }
    }

    /* Get categories*/
    getCategories() {
        this.categorytService.get().subscribe(response => {
            this.currentList = response.object;
            this.onLoadCompleted();
        });
    }

    /* Get groups by Category */
    getGroups(categoryId) {
        this.groupService.get().subscribe(response => {
            this.currentList = response.object.filter(
                group => group.category._id === categoryId
            );
        });
    }

    /* Get products by Group */
    getProducts(groupId) {
        this.productService.get().subscribe(response => {
            this.currentList = response.object.filter(
                product => product.group._id === groupId
            );
        });
    }

    /* Navigation */
    goToProduct(slug) {
        this.router.navigate(['/proizvod/' + slug]);
    }
}
