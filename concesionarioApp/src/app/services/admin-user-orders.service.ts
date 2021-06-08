import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Order } from '../../models/orders.model';
import { OrdersProductsService } from './orders-products.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserOrdersService {
  baseUrl: string = `${environment.urlApi}/admin/users`;

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
    }, 
    {
      field: 'delivery_date',
      type: 'date',
      noData: true
    },
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService,
    private _ordersProductsService: OrdersProductsService,
    private _productsService: ProductsService) { }

  getAll(id: number): Observable<Order[]> {
    return this._http.get<Order[]>(`${this.baseUrl}/${id}/orders`, {
      headers: this._authService.getToken()
    });
  }

  accept(userId: number, orderId: string): Observable<Order[]> {
    return this._http.get<Order[]>(`${this.baseUrl}/${userId}/orders/${orderId}/accept`, {
      headers: this._authService.getToken()
    });
  }

  denegate(userId: number, orderId: string): Observable<Order[]> {
    const subject = new Subject<Order[]>();

    this._http.get<Order[]>(`${this.baseUrl}/${userId}/orders/${orderId}/denegate`, {
      headers: this._authService.getToken()
    }).subscribe((data: any) => {
      this._ordersProductsService.getAll(orderId).subscribe((products) => {
        products.forEach((p, i) => {
          this._productsService.restoreStock(p).subscribe((res) => {
          });

          if (i == (products.length - 1)) {
            subject.next(data);
          }
        });
      })
    });

    return subject;
  }

  onWay(userId: number, orderId: string): Observable<Order[]> {
    return this._http.get<Order[]>(`${this.baseUrl}/${userId}/orders/${orderId}/onWay`, {
      headers: this._authService.getToken()
    });
  }

  deliver(userId: number, orderId: string): Observable<Order[]> {
    return this._http.get<Order[]>(`${this.baseUrl}/${userId}/orders/${orderId}/deliver`, {
      headers: this._authService.getToken()
    });
  }
}
