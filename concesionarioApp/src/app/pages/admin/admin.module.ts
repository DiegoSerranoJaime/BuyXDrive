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



@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UserPageComponent,
    AllOrdersComponent,
    UserOrdersComponent,
    EmployersComponent,
    ProvidersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserModule,
    MatTabsModule
  ]
})
export class AdminModule { }
