/* Core modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* 3rd party modules */

/* App components */
import { HomepageComponent } from './homepage/homepage.component';
import { BrandPageComponent } from './pages/brand-page/brand-page.component';

const routes: Routes = [
    { path: 'pocetna', component: HomepageComponent },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    { path: 'brend/:slug', component: BrandPageComponent },
    { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
    { path: '**', component: HomepageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
