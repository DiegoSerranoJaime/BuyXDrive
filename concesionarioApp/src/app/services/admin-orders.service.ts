import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminOrder } from 'src/models/adminOrders.models';
import { AuthService } from './auth.service';
import { OrdersProductsService } from './orders-products.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {

  baseUrl: string = `${environment.urlApi}/admin/orders`;

  public orderColumns: string[] = ['No.', 'Estado', 'Fecha del pedido', 'Fecha de entrega', 'Nombre', 'Apellidos', 'Email', 'Dirección', 'Acciones'];
  public orderFields: any[] = [
    {
      field: 'id',
      type: 'number',
      noData: false
    },
    {
      field: 'status',
      type: 'string',
      noData: true
    },
    {
      field: 'order_date',
      type: 'date',
      noData: true
    },
    {
      field: 'delivery_date',
      type: 'date',
      noData: true
    },
    {
      field: 'name',
      type: 'string',
      noData: false
    },
    {
      field: 'surname',
      type: 'string',
      noData: false
    },
    {
      field: 'email',
      type: 'string',
      noData: false
    },
    {
      field: 'address',
      type: 'string',
      noData: false
    },
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService,
    private _ordersProductsService: OrdersProductsService,
    private _productsService: ProductsService) { }

  getAll(): Observable<AdminOrder[]> {
    return this._http.get<AdminOrder[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

  accept(id: string): Observable<AdminOrder[]> {
    return this._http.get<AdminOrder[]>(`${this.baseUrl}/${id}/accept`, {
      headers: this._authService.getToken()
    });
  }

  denegate(id: string): Observable<AdminOrder[]> {
    const subject = new Subject<AdminOrder[]>();

    this._http.get<AdminOrder[]>(`${this.baseUrl}/${id}/denegate`, {
      headers: this._authService.getToken()
    }).subscribe((data: any) => {
      this._ordersProductsService.getAll(id).subscribe((products) => {
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

  onWay(id: string): Observable<AdminOrder[]> {
    return this._http.get<AdminOrder[]>(`${this.baseUrl}/${id}/onWay`, {
      headers: this._authService.getToken()
    });
  }

  deliver(id: string): Observable<AdminOrder[]> {
    return this._http.get<AdminOrder[]>(`${this.baseUrl}/${id}/deliver`, {
      headers: this._authService.getToken()
    });
  }
}
