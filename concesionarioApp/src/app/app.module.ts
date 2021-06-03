import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AdHostDirective } from './components/modals/modal/ad-host.directive';

import { DiscountPipe } from './pipes/discount.pipe';

import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { LoginComponent } from './components/modals/login/login.component';
import { ModalComponent } from './components/modals/modal/modal.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { StarsComponent } from './components/stars/stars.component';
import { CommentsFormComponent } from './components/comments-form/comments-form.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CartComponent } from './pages/cart/cart.component';
import { ToastComponent } from './components/toast/toast.component';
import { AmountComponent } from './pages/cart/amount/amount.component';
import { SimpleBodyModalComponent } from './components/modals/simple-body-modal/simple-body-modal.component';

import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { RegisterComponent } from './components/modals/register/register.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { UserModule } from './pages/user/user.module';
import { FiltersComponent } from './components/filters/filters.component';
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgbCarouselModule, NgbModule, NgbPaginationModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { InitProductsComponent } from './components/init-products/init-products.component';
import { SwiperModule } from 'swiper/angular';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { SlideshowTopComponent } from './components/slideshow-top/slideshow-top.component';


const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: () => {
      return localStorage.getItem('token');
    }
  }
};

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    FooterComponent,
    VehiculosComponent,
    VehiculoComponent,
    LoginComponent,
    ModalComponent,
    AdHostDirective,
    DiscountPipe,
    VehicleCardComponent,
    StarsComponent,
    CommentsFormComponent,
    CommentsComponent,
    CartComponent,
    ToastComponent,
    AmountComponent,
    SimpleBodyModalComponent,
    RegisterComponent,
    FiltersComponent,
    FilterProductsPipe,
    ArticleCardComponent,
    ArticulosComponent,
    ArticuloComponent,
    InitProductsComponent,
    SlideshowComponent,
    SlideshowTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    UserModule,
    MatExpansionModule,
    MatSliderModule,
    NgxSliderModule,
    NgbModule,
    NgbPaginationModule,
    NgbRatingModule,
    SwiperModule,
    JwtModule.forRoot(JWT_Module_Options)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
