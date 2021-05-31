import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminProviderPorduct, ProviderPorductForm } from 'src/models/adminProvidersProducts.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminProvidersProductsService {

  baseUrl: string = `${environment.urlApi}/admin/providers`;

  public orderColumns: string[] = ['No.', 'Nombre', 'Precio', 'Cantidad', 'Fecha del Pedido', 'Fecha de Entrega', 'Estado', 'Acciones'];
  public orderFields: any[] = [
    {
      field: 'id',
      type: 'number',
      noData: false
    },
    {
      field: 'name',
      type: 'string',
      noData: true
    },
    {
      field: 'price',
      type: 'price',
      noData: false
    },
    {
      field: 'amount',
      type: 'number',
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
    {
      field: 'status',
      type: 'string',
      noData: false
    }
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }


  getAll(id: number): Observable<AdminProviderPorduct[]> {
    return this._http.get<AdminProviderPorduct[]>(`${this.baseUrl}/${id}/info`, {
      headers: this._authService.getToken()
    });
  }

  getById(providerId: number, productId: number): Observable<ProviderPorductForm> {
    return this._http.get<ProviderPorductForm>(`${this.baseUrl}/${providerId}/info/product/${productId}`, {
      headers: this._authService.getToken()
    }).pipe(
      map((data) => data[0])
    );
  }

  delete(providerId: number, productId: number): Observable<AdminProviderPorduct[]> {
    return this._http.get<AdminProviderPorduct[]>(`${this.baseUrl}/${providerId}/info/delete/${productId}`, {
      headers: this._authService.getToken()
    });
  }

  add(providerId: number, product: ProviderPorductForm): Observable<AdminProviderPorduct[]> {
    return this._http.post<AdminProviderPorduct[]>(`${this.baseUrl}/${providerId}/info/add`, product, {
      headers: this._authService.getToken()
    });
  }

  cancel(providerId: number, productId: number): Observable<AdminProviderPorduct[]> {
    return this._http.get<AdminProviderPorduct[]>(`${this.baseUrl}/${providerId}/info/cancel/${productId}`, {
      headers: this._authService.getToken()
    });
  }

  deliver(providerId: number, productId: number): Observable<AdminProviderPorduct[]> {
    return this._http.get<AdminProviderPorduct[]>(`${this.baseUrl}/${providerId}/info/deliver/${productId}`, {
      headers: this._authService.getToken()
    });
  }
}
