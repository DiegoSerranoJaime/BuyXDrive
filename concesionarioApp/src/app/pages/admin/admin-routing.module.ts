import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ProvidersComponent } from './providers/providers.component';
import { EmployersComponent } from './employers/employers.component';

const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'users', component: UsersComponent },
    { path: 'users/:id', component: UserPageComponent },
    { path: 'users/:id/orders', component: UserOrdersComponent },
    { path: 'orders', component: AllOrdersComponent },
    { path: 'providers', component: ProvidersComponent },
    { path: 'employers', component: EmployersComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'users' }
  ]},
  { path: '**', pathMatch: 'full', redirectTo: 'users' }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
