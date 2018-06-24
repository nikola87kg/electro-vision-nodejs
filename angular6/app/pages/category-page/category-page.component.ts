import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Params } from '@angular/router';
import { ProductsService } from '../../_services/products.service';
import { CategoriesService } from '../../_services/categories.service';

@Component({
  selector: 'px-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
    category = {
        name: '',
        description: '',
        image: ''
    };

    categoryList = [];

    productList = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private categoryService: CategoriesService,
        private router: Router,
        private productService: ProductsService
    ) {
        this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.getCategory();
                this.getProducts();
            }
        });
    }

    ngOnInit() {
        this.getCategory();
        this.getCategories();
        this.getProducts();
    }

    /* Get category */
    getCategory() {
        let slug;
        this.activatedRoute.params.subscribe((params: Params) => {
            slug = params['slug'];
        });
        this.categoryService.getBySlug(slug).subscribe(response => {
            this.category = response.object;
        });
    }

    /* Get products + filter */
    getProducts() {
        this.productService.get().subscribe(response => {
            this.productList = response.object.filter(
                product => product.category.name === this.category.name
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

    /* Redirection */

    goToProduct(slug) {
        this.router.navigate(['/proizvod/' + slug]);
    }
}
