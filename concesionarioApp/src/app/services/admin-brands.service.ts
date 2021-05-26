import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminBrand } from 'src/models/adminBrands.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminBrandsService {
  baseUrl: string = `${environment.urlApi}/admin/brands`;

  public orderColumns: string[] = ['No.', 'Nombre', 'Tipo', 'Productos', 'Acciones'];
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
      field: 'type',
      type: 'string',
      noData: true
    },
    {
      field: 'products',
      type: 'number',
      noData: false
    }
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }


  getAll(): Observable<AdminBrand[]> {
    return this._http.get<AdminBrand[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

  delete(id: number): Observable<AdminBrand[]> {
    return this._http.get<AdminBrand[]>(`${this.baseUrl}/delete/${id}`, {
      headers: this._authService.getToken()
    });
  }
}
