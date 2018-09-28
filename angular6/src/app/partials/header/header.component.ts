import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from '../../_services/products.service';
import { GlobalService } from '../../_services/global.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

declare var $: any;

@Component({
    selector: 'px-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(
        private productService: ProductsService,
        private router: Router,
        public global: GlobalService
    ) {}

    showResult = false;

    searchInput = new FormControl();
    options = [];
    filteredOptions: Observable<any[]>;
    windowSize = null;

    @HostListener('window:resize', ['$event']) onResize(event) {
        const innerWidth = event.target.innerWidth;
        if (innerWidth > 1028) {
            this.windowSize = 'large';
        } else if (innerWidth > 768) {
            this.windowSize = 'medium';
        } else {
            this.windowSize = 'small';
        }
        this.global.windowSize.next(this.windowSize);
    }

    ngOnInit() {
        this.checkWidth();
        this.global.windowSize.next(this.windowSize);
        this.getAllProuducts();
        setTimeout(() => {
            this.filteredOptions = this.searchInput.valueChanges.pipe(
                startWith(''),
                map( value => this._filter(value) )
            );
        }, 500);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(
            option => option.toLowerCase().indexOf(filterValue) === 0
        );
    }

    getAllProuducts() {
        this.productService.get().subscribe( (result) => {
            this.options = result.object.map(
                object => object.slug
            );

        });
    }

    goToProduct(slug) {
        this.showResult = false;
        this.router.navigate(['/proizvod/' + slug]);
    }

    checkWidth() {
        const innerWidth = window.innerWidth;
        if (innerWidth > 1028) {
            this.windowSize = 'large';
        } else if (innerWidth > 768) {
            this.windowSize = 'medium';
        } else {
            this.windowSize = 'small';
        }
        this.global.windowSize.next(this.windowSize);
    }
}
