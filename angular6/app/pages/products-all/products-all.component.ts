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
    headline: string;
    isLoaded: Boolean;
    currentLevel: number;
    currentList: Array<any>;
    lastCategoryID: any;
    lastGroupID: any;
    selectedItemName = 'Sve kategorije';

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

    OnLevelChange(increment, id?, slug?) {
        if (increment === 0) {
            this.currentLevel = 1;
        } else {
            this.currentLevel = this.currentLevel + increment;
        }
        if ( this.currentLevel === 1 ) {
            this.getCategories();
            this.selectedItemName = 'Sve kategorije';
        } else if ( this.currentLevel === 2 ) {
            let tempID = this.lastCategoryID;
            if (id) {
                tempID = id;
                this.lastCategoryID = id;
            }
            this.getGroups(tempID);
            this.selectedItemName = 'Filtrirane grupe proizvoda';
        } else if ( this.currentLevel === 3 ) {
            let tempID = this.lastCategoryID;
            if (id) {
                tempID = id;
                this.lastGroupID = id;
            }
            this.getProducts(tempID);
            this.selectedItemName = 'Filtrirani proizvodi';
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
