import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user.component';

const USER_ROUTES: Routes = [
  { path: '', component: UserComponent, children: [
    { path: 'profile', component: ProfileComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'history/:id', component: OrderComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'orders/:id', component: OrderComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'profile' }
  ]},
  { path: '**', pathMatch: 'full', redirectTo: 'profile' }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
