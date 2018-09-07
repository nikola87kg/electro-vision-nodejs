/* Core modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* App components */
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { GroupsComponent } from './groups/groups.component';
import { PreviewComponent } from './preview/preview.component';
import { GalleryAdminComponent } from './gallery/gallery-admin.component';

const routes: Routes = [
  { path: '',  component: AdminComponent, children: [
    { path: 'pregled',  component: PreviewComponent },
    { path: 'proizvodi',  component: ProductsComponent },
    { path: 'galerija',  component: GalleryAdminComponent },
    { path: 'kategorije',  component: CategoriesComponent },
    { path: 'brendovi',  component: BrandsComponent },
    { path: 'grupe',  component: GroupsComponent },
    { path: '',  redirectTo: 'pregled', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
