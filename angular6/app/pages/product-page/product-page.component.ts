import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from '../../_services/products.service';

@Component({
  selector: 'px-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

    product = {
        name: '',
        description: '',
        image: '',
        group: {
            name: '',
            slug: ''
        },
        brand: {
            name: '',
            slug: ''
        },
        category: {
            name: '',
            slug: ''
        }
    };
    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductsService,
        private router: Router) {}

    ngOnInit() {
        setTimeout( () => {
            this.getProduct();
        }, 1);
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
    goToGroup(slug) {
        this.router.navigate(['/potkategorija/' + slug]);
    }

    /* Get brand */
    getProduct() {
        let slug;
        this.activatedRoute.params.subscribe((params: Params) => {
          slug = params['slug'];
        });
        this.productService.getBySlug(slug).subscribe(result => {
            let productResponse: any = {
                message: '',
                object: {
                    name: '',
                    description: '',
                    image: ''
                }
            };
            productResponse = result;
            this.product = productResponse.object;
        });
    }
}
