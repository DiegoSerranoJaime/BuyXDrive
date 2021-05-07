import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';
import { order } from 'src/models/orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public displayedColumns: string[] = [];
  public displayedData: any[] = [];
  public dataSource = new MatTableDataSource<order>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _ordersService: OrdersService) {}


  ngOnInit(): void {
    this.displayedColumns = this._ordersService.orderColumns;
    this.displayedData = this._ordersService.orderFields;

    this._ordersService.getOrdersNotDelivered().subscribe((orders) => {
      this.dataSource.data = orders;
      this.initPaginator();
    });
  }

  initPaginator() {
    this.dataSource.paginator = this.paginator;
  }

}
