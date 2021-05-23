import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminOrder } from 'src/models/adminOrders.models';
import { AuthService } from './auth.service';

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
    private _authService: AuthService) { }

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
    return this._http.get<AdminOrder[]>(`${this.baseUrl}/${id}/denegate`, {
      headers: this._authService.getToken()
    });
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
