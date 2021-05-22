import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/models/orders.model';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    }
  ];

  constructor(public _ordersService: OrdersService) {}

  ngOnInit(): void {
  }
}
