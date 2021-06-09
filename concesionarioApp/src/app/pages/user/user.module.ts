import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GenericMaterialTableComponent } from 'src/app/components/generic-material-table/generic-material-table.component';
import { MatSortModule } from '@angular/material/sort';
import { UpdateNameComponent } from './forms/update-name/update-name.component';
import { UpdateEmailComponent } from './forms/update-email/update-email.component';
import { UpdateAddressComponent } from './forms/update-address/update-address.component';
import { UpdatePhoneNumberComponent } from './forms/update-phone-number/update-phone-number.component';
import { UpdateGenderComponent } from './forms/update-gender/update-gender.component';
import { UpdatePasswordComponent } from './forms/update-password/update-password.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    HistoryComponent,
    OrdersComponent,
    OrderComponent,
    GenericMaterialTableComponent,
    UpdateNameComponent,
    UpdateEmailComponent,
    UpdateAddressComponent,
    UpdatePhoneNumberComponent,
    UpdateGenderComponent,
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    ReactiveFormsModule
  ],
  exports: [
    GenericMaterialTableComponent
  ]
})
export class UserModule { }
