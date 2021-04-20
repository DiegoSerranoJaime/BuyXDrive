import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AdHostDirective } from './components/modals/modal/ad-host.directive';

import { DiscountPipe } from './pipes/discount.pipe';

import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { LoginComponent } from './components/modals/login/login.component';
import { ModalComponent } from './components/modals/modal/modal.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { InitVehiclesComponent } from './components/init-vehicles/init-vehicles.component';
import { StarsComponent } from './components/stars/stars.component';
import { CommentsFormComponent } from './components/comments-form/comments-form.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    FooterComponent,
    VehiculosComponent,
    ProductosComponent,
    VehiculoComponent,
    ProductoComponent,
    LoginComponent,
    ModalComponent,
    AdHostDirective,
    DiscountPipe,
    VehicleCardComponent,
    InitVehiclesComponent,
    StarsComponent,
    CommentsFormComponent,
    CommentsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
