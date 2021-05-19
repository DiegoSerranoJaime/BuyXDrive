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
  baseUrl: string = `${environment.urlApi}/admin`;

  public orderColumns: string[] = ['Contador', 'Nombre', 'Email', 'Género', 'Dirección', 'No. Teléfono', 'Tipo', 'Acciones'];
  public orderFields: any[] = [
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
      field: 'type',
      type: 'string',
      noData: false
    },
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }

  getAllUsers(): Observable<AdminUsers[]> {
    return this._http.get<AdminUsers[]>(`${this.baseUrl}/users`, {
      headers: this._authService.getToken()
    });
  }

  getAllEmployers(): Observable<AdminUsers[]> {
    return this._http.get<AdminUsers[]>(`${this.baseUrl}/employers`, {
      headers: this._authService.getToken()
    });
  }
}
