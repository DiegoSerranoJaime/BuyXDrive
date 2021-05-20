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

  public displayedColumns: string[] = [];
  public displayedData: any[] = [];
  public dataSource = new MatTableDataSource<AdminOrder>();
  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _adminOrdersService: AdminOrdersService) {}


  ngOnInit(): void {
    this.displayedColumns = this._adminOrdersService.orderColumns;
    this.displayedData = this._adminOrdersService.orderFields;

    this._adminOrdersService.getAllOrders().subscribe((orders) => {
      this.dataSource.data = orders;
    });
  }

}
