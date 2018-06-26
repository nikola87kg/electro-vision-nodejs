import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Params } from '@angular/router';
import { CategoriesService } from '../../_services/categories.service';
import { GroupsService } from '../../_services/groups.service';
import { ProductsService } from '../../_services/products.service';

@Component({
  selector: 'px-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
    group = {
        name: '',
        description: '',
        image: ''
    };

    categoryList = [];
    groupList = [];
    productList = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private categoryService: CategoriesService,
        private groupService: GroupsService,
        private router: Router,
        private productService: ProductsService
    ) {
    this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
                this.getGroup();
                this.getProducts();
            }
        });
    }

    ngOnInit() {
        this.getGroup();
        this.getProducts();
        this.getCategories();
    }


    /* Get category */
    getGroup() {
        let slug;

        this.activatedRoute.params.subscribe((params: Params) => {
            slug = params['slug'];
        });
        this.groupService.getBySlug(slug).subscribe(response => {
            this.group = response.object;
        });
    }

    /* Get products + filter */
    getProducts() {
        this.productService.get().subscribe(response => {
            this.productList = response.object.filter(
                product => product.group.name === this.group.name
            );
        });
    }

    /* Get categories */
    getCategories() {
        this.categoryService.get().subscribe(response => {
            this.categoryList = response.object;

        });
    }

    /* Navigation */
    goToCategory(slug) {
        this.router.navigate(['/kategorija/' + slug]);
    }
    goToProduct(slug) {
        this.router.navigate(['/proizvod/' + slug]);
    }
    goToGroup(slug) {
        this.router.navigate(['/potkategorija/' + slug]);
    }
    goToProducts() {
        this.router.navigate(['/lista-proizvoda/']);
    }

}
