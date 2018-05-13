/* Core modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* 3rd party modules */
import { NgUploaderModule } from 'ngx-uploader';

/* App modules */
import { AdminRoutingModule } from './admin-routing.module';

/* App compontents */
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { GroupsComponent } from './groups/groups.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgUploaderModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    GroupsComponent,
    PreviewComponent
  ]
})
export class AdminModule { }
