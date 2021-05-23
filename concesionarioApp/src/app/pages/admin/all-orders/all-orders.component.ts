import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminOrdersService } from 'src/app/services/admin-orders.service';
import { AdminOrder } from 'src/models/adminOrders.models';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
    {
      name: 'order'
    }
  ]

  constructor(public _adminOrdersService: AdminOrdersService) {}


  ngOnInit(): void {
  }

}
