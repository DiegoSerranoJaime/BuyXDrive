import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';


@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    HistoryComponent,
    OrdersComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class UserModule { }
