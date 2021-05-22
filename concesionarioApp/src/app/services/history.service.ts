import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from 'src/models/orders.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
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

  getAll(): Observable<Order[]> {
    return this._http.get<Order[]>(`${this.baseUrl}/history`, {
      headers: this._authService.getToken()
    });
  }

  cancel(id): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/${id}/cancel`, {
      headers: this._authService.getToken()
    });
  }
}
