import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { order } from 'src/models/orders.model';
import { cart_product } from 'src/models/products.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl: string = `${ environment.urlApi }/orders`;
  public orderColumns: string[] = ['Código', 'Estado', 'Fecha del pedido', 'Fecha de entrega', 'Acciones'];
  public orderFields: any[] = [
    {
      field: 'id',
      type: 'string'
    },
    {
      field: 'status',
      type: 'string'
    },
    {
      field: 'order_date',
      type: 'date'
    }, {
      field: 'delivery_date',
      type: 'date'
    }
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }

  buyProducts(products: cart_product[]): Observable<string> {
    let order = new Subject<string>();

    this._http.post(this.baseUrl, {}, {
      headers: this._authService.getToken()
    }).subscribe((data: any) => {
      products.forEach((product) => {

        let dataEnvio = {
          order_id: data.order_id,
          product_id: product.id,
          amount: product.amount,
          price: product.price,
          discount: product.discount
        };

        this._http.post(`${this.baseUrl}/product`, dataEnvio, {
          headers: this._authService.getToken()
        }).subscribe();
      });

      order.next(data.order_id);
    });

    return order;
  }

  getOrdersNotDelivered(): Observable<order[]> {
    return this._http.get<order[]>(`${this.baseUrl}/not-delivered`, {
      headers: this._authService.getToken()
    });
  }
}
