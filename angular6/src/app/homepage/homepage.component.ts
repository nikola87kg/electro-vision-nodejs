/* Angular */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { BrandsService } from '../_services/brands.service';
import { CategoriesService } from '../_services/categories.service';
import { ProductsService } from '../_services/products.service';
import { GlobalService } from '../_services/global.service';

@Component({
    selector: 'px-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    productList = [];
    brandList = [];
    categoryList = [];
    navItemsVisible = false;
    windowSize;
    currentSlider = 0;
    banners = [
        {
            title: 'Ugradnja kamera',
            content: 'Nudimo kamere vrhunskog kvaliteta.',
            imageUrl: './assets/baner/baner1.jpg'
        },
        {
            title: 'Ugradnja alarma',
            content: 'Ugrađujemo moderne alarme.',
            imageUrl: './assets/baner/baner2.jpg'
        },
        {
            title: 'Video nadzor',
            content: 'Najbolji video nadzor u gradu!',
            imageUrl: './assets/baner/baner3.jpg'
        }
    ];

    constructor(
        private brandService: BrandsService,
        private categoryService: CategoriesService,
        private productService: ProductsService,
        public global: GlobalService,
        private router: Router) { }

    ngOnInit() {
        this.getBrands();
        this.getCategories();
        this.getProducts();
        this.global.windowSize.subscribe(
            (result => this.windowSize = result)
        );
        setInterval( () => {
            this.rollSlides();
        }, 2000 );
    }

    /* Carousel */
    rollSlides() {
        const sliderIndex = this.currentSlider;
        const bannersLength = this.banners.length;
        if (sliderIndex < bannersLength - 1) {
            this.currentSlider++;
        } else {
            this.currentSlider = 0;
        }
    }


    /* Get products + filter */
    getProducts() {
        this.productService.get().subscribe(response => {
            this.productList = response.object.filter(
                item => item.vip === true
            );
        });
    }

    /* Get brand */
    getBrands() {
        this.brandService.get().subscribe(response => {
            this.brandList = response.object;
        });
    }

    /* Get category */
    getCategories() {
        this.categoryService.get().subscribe(response => {
            this.categoryList = response.object;
        });
    }

    /* Navigation */
    goToBrand(slug) {
        this.router.navigate(['/brend/' + slug]);
    }
    goToProduct(slug) {
        this.router.navigate(['/proizvod/' + slug]);
    }
    goToCategory(slug?) {
        if (slug) {
            this.router.navigate(['/kategorije/' + slug]);
        } else {
            this.router.navigate(['/kategorije']);
        }
    }

}
