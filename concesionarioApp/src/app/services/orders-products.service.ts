import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderProduct } from 'src/models/orders.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersProductsService {

  private baseUrl: string = `${ environment.urlApi }/admin/orders`;

  public orderColumns: string[] = ['Contador', 'Nombre', 'Cantidad', 'Precio', 'Descuento'];
  public orderFields: any[] = [
    {
      field: 'name',
      type: 'string',
      noData: true
    },
    {
      field: 'amount',
      type: 'number',
      noData: false
    },
    {
      field: 'price',
      type: 'price',
      noData: false
    },
    {
      field: 'discount',
      type: 'percentage',
      noData: false
    },
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }

  getAll(id: string): Observable<OrderProduct[]> {
    return this._http.get<OrderProduct[]>(`${this.baseUrl}/${id}`, {
      headers: this._authService.getToken()
    });
  }
}
