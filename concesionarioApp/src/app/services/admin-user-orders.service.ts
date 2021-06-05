import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Order } from '../../models/orders.model';

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
    private _authService: AuthService) { }

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
    return this._http.get<Order[]>(`${this.baseUrl}/${userId}/orders/${orderId}/denegate`, {
      headers: this._authService.getToken()
    });
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
