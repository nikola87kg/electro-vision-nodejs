/* Core modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* 3rd party modules */

/* App components */
import { HomepageComponent } from './homepage/homepage.component';
import { BrandPageComponent } from './pages/brand-page/brand-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';

const routes: Routes = [
    { path: 'pocetna', component: HomepageComponent },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    { path: 'brend/:slug', component: BrandPageComponent },
    { path: 'proizvod/:slug', component: ProductPageComponent },
    { path: 'potkategorija/:slug', component: GroupPageComponent },
    { path: 'kategorija/:slug', component: CategoryPageComponent },
    { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
    { path: '**', component: HomepageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
