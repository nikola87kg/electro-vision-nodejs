/* Core modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* App components */
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { GroupsComponent } from './groups/groups.component';

const routes: Routes = [
  { path: '',  component: AdminComponent, children: [
    { path: 'proizvodi',  component: ProductsComponent },
    { path: 'kategorije',  component: CategoriesComponent },
    { path: 'brendovi',  component: BrandsComponent },
    { path: 'grupe',  component: GroupsComponent },
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
