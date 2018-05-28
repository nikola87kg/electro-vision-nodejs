import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../_services/brands.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
    constructor(
        private activatedRoute: ActivatedRoute,
        private brandService: BrandsService) {}

    ngOnInit() {
        this.getBrand();
    }

    /* Get brand */
    getBrand() {
        let slug;
        this.activatedRoute.params.subscribe((params: Params) => {
          slug = params['slug'];
        });
        this.brandService.getBySlug(slug).subscribe(result => {
            console.log('result', result);
            let brandsResponse: any = {
                message: '',
                object: {
                    name: '',
                    description: '',
                    image: ''
                }
            };
            brandsResponse = result;
            this.brand = brandsResponse.object;

        });
    }
}
