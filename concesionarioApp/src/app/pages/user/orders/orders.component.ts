import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/models/orders.model';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
    {
      name: 'cancel',
      route: null
    }
  ]


  constructor(public _ordersService: OrdersService) {}


  ngOnInit(): void {
  }
}
