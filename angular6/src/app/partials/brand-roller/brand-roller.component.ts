import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../_services/brands.service';
import { Router } from '@angular/router';

@Component({
    selector: 'px-brand-roller',
    templateUrl: './brand-roller.component.html',
    styleUrls: ['./brand-roller.component.scss']
})
export class BrandRollerComponent implements OnInit {

    brandList = [];

    constructor(
        private brandService: BrandsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getBrands();
    }

    /* Get brand */
    getBrands() {
        this.brandService.get().subscribe(response => {
            this.brandList = response.object;
        });
    }

    /* Navigation */
    goToBrand(slug) {
        this.router.navigate(['/brend/' + slug]);
    }
}
