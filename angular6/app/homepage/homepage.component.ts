/* Angular */
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private brandService: BrandsService,
    private router: Router
  ) { }


  ngOnInit() {
    this.getBrands();
  }

  /* Get brand */
  getBrands() {
    this.brandService.get()
      .subscribe(
      response => this.brandList = response
      );
  }

  /* Navigate to Brand */
  goToBrand(slug) {
    this.router.navigate(['/brendovi/' + slug]);
  }
}
