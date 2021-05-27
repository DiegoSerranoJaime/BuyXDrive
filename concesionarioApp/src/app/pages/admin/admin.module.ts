import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { EmployersComponent } from './employers/employers.component';
import { ProvidersComponent } from './providers/providers.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserModule } from '../user/user.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminVehiclesComponent } from './products/admin-vehicles/admin-vehicles.component';
import { ProductsComponent } from './products/products.component';
import { AdminArticlesComponent } from './products/admin-articles/admin-articles.component';
import { BrandsComponent } from './brands/brands.component';
import { BrandComponent } from './brand/brand.component';
import { ProvidersFormComponent } from './forms/providers-form/providers-form.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrandsFormComponent } from './forms/brands-form/brands-form.component';



@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UserPageComponent,
    AllOrdersComponent,
    UserOrdersComponent,
    EmployersComponent,
    ProvidersComponent,
    AdminVehiclesComponent,
    ProductsComponent,
    AdminArticlesComponent,
    BrandsComponent,
    BrandComponent,
    ProvidersFormComponent,
    BrandsFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
