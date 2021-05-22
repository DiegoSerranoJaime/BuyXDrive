import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminUsers } from 'src/models/adminUsers.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  baseUrl: string = `${environment.urlApi}/admin/users`;

  public orderColumns: string[] = ['No.', 'Nombre', 'Email', 'Género', 'Dirección', 'No. Teléfono', 'Activo', 'Acciones'];
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
      noData: false
    },
    {
      field: 'gender',
      type: 'string',
      noData: false
    },
    {
      field: 'address',
      type: 'string',
      noData: false
    },
    {
      field: 'phoneNumber',
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

  getAll(): Observable<AdminUsers[]> {
    return this._http.get<AdminUsers[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

  delete(id: number): Observable<AdminUsers> {
    return this._http.get<AdminUsers>(`${this.baseUrl}/delete/${id}`, {
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
}
