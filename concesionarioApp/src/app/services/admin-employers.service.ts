import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminEmployer } from 'src/models/adminEmployers.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminEmployersService {

  baseUrl: string = `${environment.urlApi}/admin/employers`;

  public orderColumns: string[] = ['No.', 'Nombre', 'Email', 'Género', 'Dirección', 'No. Teléfono', 'Tipo', 'Activo', 'Acciones'];
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
      field: 'type',
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


  getAll(): Observable<AdminEmployer[]> {
    return this._http.get<AdminEmployer[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

  delete(id: number): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/delete/${id}`, {
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
