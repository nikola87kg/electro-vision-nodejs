/* Core modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* App components */
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: 'pocetna', component: HomepageComponent },
  { path: 'admin',   loadChildren: './admin/admin.module#AdminModule' },
  { path: '',        redirectTo: '/pocetna', pathMatch: 'full' },
  { path: '**',      component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
