import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ToastComponent } from './components/toast/toast.component';
import { AmountComponent } from './pages/cart/amount/amount.component';
import { RatingModule } from 'ng-starrating';
import { SimpleBodyModalComponent } from './components/modals/simple-body-modal/simple-body-modal.component';

import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

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
    CartComponent,
    ToastComponent,
    AmountComponent,
    SimpleBodyModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    RatingModule,
    JwtModule.forRoot(JWT_Module_Options)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
