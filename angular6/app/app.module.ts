/* Core modules */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

/* 3rd party modules */
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AgmCoreModule } from '@agm/core';

/* App modules */
import { AppMaterialModule } from './app.material.module';
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
import { ContactComponent } from './pages/contact/contact.component';
import { AdminGuard } from './admin/admin.guard';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    Ng2SearchPipeModule,
    AppMaterialModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDa6KMmeN1YNFuyxnH4v2jDdLQLxuiHQ1s'
    }),
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
    ProductsAllComponent,
    ContactComponent
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
