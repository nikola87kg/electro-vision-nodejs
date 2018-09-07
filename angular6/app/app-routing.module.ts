/* Core modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* App components */
import { BrandPageComponent } from './pages/brand-page/brand-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductsAllComponent } from './pages/products-all/products-all.component';

/* Guards */
import { AdminGuard } from './admin/admin.guard';

const routes: Routes = [
    { path: 'pocetna',              component: HomepageComponent },
    { path: 'kontakt',              component: ContactComponent },
    { path: 'galerija',             component: GalleryComponent },
    { path: 'proizvod/:slug',       component: ProductPageComponent },
    { path: 'brend/:slug',          component: BrandPageComponent },
    { path: 'potkategorija/:slug',  component: GroupPageComponent },
    { path: 'kategorija/:slug',     component: CategoryPageComponent },
    { path: 'kategorije',      component: ProductsAllComponent },
    { path: 'admin',                canActivate: [ AdminGuard ], loadChildren: './admin/admin.module#AdminModule' },
    { path: '',                     redirectTo: '/pocetna', pathMatch: 'full' },
    { path: '**',                   redirectTo: '/pocetna', }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
