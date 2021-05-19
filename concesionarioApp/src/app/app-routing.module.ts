import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { CartComponent } from './pages/cart/cart.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';

const APP_ROUTES: Routes = [
  { path: 'inicio' , component: InicioComponent },
  { path: 'vehiculos' , component: VehiculosComponent },
  { path: 'vehiculos/:id' , component: VehiculoComponent },
  { path: 'articulos' , component: ArticulosComponent },
  { path: 'articulos/:id' , component: ArticuloComponent },
  { path: 'cart', component: CartComponent },
  { path: 'user', canActivate: [AuthGuard], loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)},
  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)},
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
