import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminProviderPorduct, ProviderPorductForm } from 'src/models/adminProvidersProducts.models';
import { AuthService } from './auth.service';
import { ProductsService } from './products.service';

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
    private _authService: AuthService,
    private _productsService: ProductsService) { }

  getAll(id: number): Observable<AdminProviderPorduct[]> {
    return this._http.get<AdminProviderPorduct[]>(`${this.baseUrl}/${id}/info`, {
      headers: this._authService.getToken()
    });
  }

  delete(providerId: number, productId: number, orderDate: Date): Observable<AdminProviderPorduct[]> {
    return this._http.get<AdminProviderPorduct[]>(`${this.baseUrl}/${providerId}/info/delete/${productId}/${orderDate}`, {
      headers: this._authService.getToken()
    });
  }

  add(providerId: number, product: ProviderPorductForm): Observable<AdminProviderPorduct[]> {
    return this._http.post<AdminProviderPorduct[]>(`${this.baseUrl}/${providerId}/info/add`, product, {
      headers: this._authService.getToken()
    });
  }

  cancel(providerId: number, productId: number, orderDate: Date): Observable<AdminProviderPorduct[]> {
    return this._http.get<AdminProviderPorduct[]>(`${this.baseUrl}/${providerId}/info/cancel/${productId}/${orderDate}`, {
      headers: this._authService.getToken()
    });
  }

  deliver(providerId: number, productId: number, orderDate: Date): Observable<AdminProviderPorduct[]> {
    const subject = new Subject<AdminProviderPorduct[]>();

    if (orderDate) {
      this._http.get<AdminProviderPorduct[]>(`${this.baseUrl}/${providerId}/info/deliver/${productId}/${orderDate}`, {
        headers: this._authService.getToken()
      }).subscribe((data: any) => {
        if (data.ok) {
          const product = data.data.find((d) => d.id == productId);
      
          this._productsService.restoreStock(product).subscribe(() => {
            subject.next(data.data);
          });
        }
      });
    }
    
    return subject;
  }
}
