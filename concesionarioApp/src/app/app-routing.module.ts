import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './pages/cart/cart.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';

const APP_ROUTES: Routes = [
  { path: 'inicio' , component: InicioComponent },
  { path: 'vehiculos' , component: VehiculosComponent },
  { path: 'vehiculos/:id' , component: VehiculoComponent },
  { path: 'productos' , component: ProductosComponent },
  { path: 'productos/:id' , component: ProductoComponent },
  { path: 'cart', component: CartComponent },
  { path: 'user', canActivate: [AuthGuard], loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
