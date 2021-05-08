import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { orderProduct } from 'src/models/orders.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersProductsService {

  private baseUrl: string = `${ environment.urlApi }/orders`;

  public orderColumns: string[] = ['No.', 'Nombre', 'Cantidad', 'Precio', 'Descuento'];
  public orderFields: any[] = [
    {
      field: 'count',
      type: 'count',
      noData: false
    },
    {
      field: 'name',
      type: 'string',
      noData: true
    },
    {
      field: 'amount',
      type: 'number',
      noData: true
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

  getProductsFromAnOrder(id: string): Observable<orderProduct[]> {
    return this._http.get<orderProduct[]>(`${this.baseUrl}/${id}/products`, {
      headers: this._authService.getToken()
    });
  }
}
