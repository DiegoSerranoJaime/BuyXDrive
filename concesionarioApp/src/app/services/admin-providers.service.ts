import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AdminProvider, ProviderForm } from 'src/models/adminProviders.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminProvidersService {
  baseUrl: string = `${environment.urlApi}/admin/providers`;

  public orderColumns: string[] = ['No.', 'Nombre', 'Email', 'Dirección', 'No. Teléfono', 'Activo', 'Acciones'];
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
      field: 'email',
      type: 'string',
      noData: true
    },
    {
      field: 'address',
      type: 'string',
      noData: true
    },
    {
      field: 'phone_number',
      type: 'string',
      noData: false
    },
    {
      field: 'active',
      type: 'boolean',
      noData: false
    }
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }

  getAll(): Observable<AdminProvider[]> {
    return this._http.get<AdminProvider[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

  getById(id: number): Observable<ProviderForm> {
    return this._http.get<ProviderForm>(`${this.baseUrl}/${id}`, {
      headers: this._authService.getToken()
    }).pipe(map((data) => data[0]));
  }

  delete(id: number): Observable<AdminProvider> {
    return this._http.get<AdminProvider>(`${this.baseUrl}/delete/${id}`, {
      headers: this._authService.getToken()
    });
  }

  logicDelete(id: number): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/logicDelete/${id}`, {
      headers: this._authService.getToken()
    });
  }
  
  reactive(id: number): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/reactive/${id}`, {
      headers: this._authService.getToken()
    });
  }

  add(provider: ProviderForm): Observable<AdminProvider[]> {
    return this._http.post<AdminProvider[]>(`${this.baseUrl}/add`, provider, {
      headers: this._authService.getToken()
    });
  }

  update(id: number, provider: ProviderForm): Observable<AdminProvider[]> {
    return this._http.put<AdminProvider[]>(`${this.baseUrl}/update/${id}`, provider, {
      headers: this._authService.getToken()
    });
  }
}
