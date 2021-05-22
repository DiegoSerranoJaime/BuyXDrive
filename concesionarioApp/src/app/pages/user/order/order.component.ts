import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersProductsService } from 'src/app/services/orders-products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public id: string;


  constructor(private _activatedRoute: ActivatedRoute,
    public _ordersProductsService: OrdersProductsService) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params.id;
  }

}
