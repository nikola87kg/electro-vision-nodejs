import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../_services/brands.service';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { ProductsService } from '../../_services/products.service';

@Component({
    selector: 'px-brand-page',
    templateUrl: './brand-page.component.html',
    styleUrls: ['./brand-page.component.scss']
})
export class BrandPageComponent implements OnInit {
    brand = {
        name: '',
        description: '',
        image: ''
    };

    productList = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private brandService: BrandsService,
        private router: Router,
        private productService: ProductsService
    ) {
        this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.getBrand();
                this.getProducts();
            }
        });
    }

    ngOnInit() {
        this.getBrand();
        this.getProducts();
    }

    /* Get brand */
    getBrand() {
        let slug;
        this.activatedRoute.params.subscribe((params: Params) => {
            slug = params['slug'];
        });
        this.brandService.getBySlug(slug).subscribe(response => {
            this.brand = response.object;
        });
    }

    /* Get products + filter */
    getProducts() {
        this.productService.get().subscribe(response => {
            this.productList = response.object.filter(
                p => p.brand.name === this.brand.name
            );
        });
    }

    /* Redirection */

    goToProduct(slug) {
        this.router.navigate(['/proizvod/' + slug]);
    }
}
