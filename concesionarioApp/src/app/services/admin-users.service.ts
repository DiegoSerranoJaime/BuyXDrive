import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminUser, UserForm } from 'src/models/adminUsers.model';
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

  getAll(): Observable<AdminUser[]> {
    return this._http.get<AdminUser[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

  getById(id: number): Observable<UserForm> {
    return this._http.get<UserForm>(`${this.baseUrl}/${id}`, {
      headers: this._authService.getToken()
    }).pipe(
      map((data) => data[0])
    );
  }

  delete(id: number): Observable<AdminUser[]> {
    return this._http.get<AdminUser[]>(`${this.baseUrl}/delete/${id}`, {
      headers: this._authService.getToken()
    });
  }

  logicDelete(id: number): Observable<AdminUser[]> {
    return this._http.get<AdminUser[]>(`${this.baseUrl}/logicDelete/${id}`, {
      headers: this._authService.getToken()
    });
  }
  reactive(id: number): Observable<AdminUser[]> {
    return this._http.get<AdminUser[]>(`${this.baseUrl}/reactive/${id}`, {
      headers: this._authService.getToken()
    });
  }

  add(user: UserForm): Observable<AdminUser[]> {
    return this._http.post<AdminUser[]>(`${this.baseUrl}/add`, user, {
      headers: this._authService.getToken()
    });
  }

  update(id: number, user: UserForm): Observable<AdminUser[]> {
    return this._http.put<AdminUser[]>(`${this.baseUrl}/update/${id}`, user, {
      headers: this._authService.getToken()
    });
  }
}
