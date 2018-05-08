/* Angular */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

/* Pixelarium */


@Component({
  selector: 'px-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  brandList = [];

  constructor(
    private router: Router
  ) { }


  ngOnInit() {
    // this.getBrands();
  }

  // /* Get brand */
  // getBrands() {
  //   this.brandService.get()
  //     .subscribe(
  //     response => this.brandList = response.object
  //     );
  // }

  // /* Navigate to Brand */
  // goToBrand(slug) {
  //   this.router.navigate(['/brendovi/' + slug]);
  // }
}
