/* Angular */
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

/* Pixelarium */
import { BrandsService } from 'angular6/app/_services/brands.service';

@Component({
    selector: 'px-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    brandList: any = [];
    listMobile = false;
    brandsMobile = true;
    categoryMobile = false;

    constructor(private brandService: BrandsService, private router: Router) {}

    actualWidth = window.innerWidth;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.actualWidth = event.target.innerWidth;
    }

    ngOnInit() {
        this.getBrands();
    }

    bigScreen() {
        if (this.actualWidth > 1028) {
            console.log(this.actualWidth);
            return true;
        }
        console.log(this.actualWidth);
        return false;
    }

    smallScreen() {
        if (this.actualWidth < 768) {
            console.log(this.actualWidth);
            return true;
        }
        console.log(this.actualWidth);
        return false;
    }
    /* Get brand */
    getBrands() {
        this.brandService.get().subscribe(result => {
            let brandsResponse: any = {
                message: '',
                object: {}
            };
            brandsResponse = result;
            this.brandList = brandsResponse.object;
        });
    }

    /* Navigate to Brand */
    goToBrand(slug) {
        this.router.navigate(['/brend/' + slug]);
    }

    /* Toggle */
    toggleList() {
        this.listMobile = !this.listMobile;
    }

    toggleBrands() {
        this.brandsMobile = !this.brandsMobile;
    }

    toggleCategories() {
        this.categoryMobile = !this.categoryMobile;
    }
}
