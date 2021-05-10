import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrdersProductsService } from 'src/app/services/orders-products.service';
import { OrderProduct } from 'src/models/orders.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public displayedColumns: string[] = [];
  public displayedData: any[] = [];
  public dataSource = new MatTableDataSource<OrderProduct>();

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private _activatedRoute: ActivatedRoute,
    private _ordersProductsService: OrdersProductsService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.displayedColumns = this._ordersProductsService.orderColumns;
      this.displayedData = this._ordersProductsService.orderFields;

      this._ordersProductsService.getProductsFromAnOrder(params.id).subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }

}
