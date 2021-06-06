import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from 'src/models/orders.model';
import { CartProduct } from 'src/models/products.model';
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
      type: 'string',
      noData: false
    },
    {
      field: 'status',
      type: 'string',
      noData: false
    },
    {
      field: 'order_date',
      type: 'date',
      noData: false
    }, {
      field: 'delivery_date',
      type: 'date',
      noData: true
    }
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }

  buyProducts(products: CartProduct[]): Observable<string> {
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

  getAll(): Observable<Order[]> {
    return this._http.get<Order[]>(`${this.baseUrl}/not-delivered`, {
      headers: this._authService.getToken()
    });
  }

  cancel(id): Observable<Order[]> {
    return this._http.get<Order[]>(`${this.baseUrl}/${id}/cancel`, {
      headers: this._authService.getToken()
    });
  }
}
