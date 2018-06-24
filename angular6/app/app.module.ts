/* Core modules */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

/* 3rd party modules */
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

/* App modules */
import { AppRoutingModule } from './app-routing.module';

/* App components */
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { BrandPageComponent } from './pages/brand-page/brand-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { BrandRollerComponent } from './partials/brand-roller/brand-roller.component';
import { NavigationMenuComponent } from './partials/navigation-menu/navigation-menu.component';
import { ProductsAllComponent } from './pages/products-all/products-all.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    BrandPageComponent,
    ProductPageComponent,
    GroupPageComponent,
    CategoryPageComponent,
    BrandRollerComponent,
    NavigationMenuComponent,
    ProductsAllComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
