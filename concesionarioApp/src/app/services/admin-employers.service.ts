import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminEmployer, EmployerForm } from 'src/models/adminEmployers.models';
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
      field: 'phone_number',
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

  getById(id: number): Observable<EmployerForm> {
    return this._http.get<EmployerForm>(`${this.baseUrl}/${id}`, {
      headers: this._authService.getToken()
    }).pipe(
      map((data) => data[0])
    );
  }

  delete(id: number): Observable<AdminEmployer[]> {
    return this._http.get<AdminEmployer[]>(`${this.baseUrl}/delete/${id}`, {
      headers: this._authService.getToken()
    });
  }

  logicDelete(id: number): Observable<AdminEmployer[]> {
    return this._http.get<AdminEmployer[]>(`${this.baseUrl}/logicDelete/${id}`, {
      headers: this._authService.getToken()
    });
  }

  reactive(id: number): Observable<AdminEmployer[]> {
    return this._http.get<AdminEmployer[]>(`${this.baseUrl}/reactive/${id}`, {
      headers: this._authService.getToken()
    });
  }

  add(user: EmployerForm): Observable<AdminEmployer[]> {
    return this._http.post<AdminEmployer[]>(`${this.baseUrl}/add`, user, {
      headers: this._authService.getToken()
    });
  }

  update(id: number, user: EmployerForm): Observable<AdminEmployer[]> {
    return this._http.put<AdminEmployer[]>(`${this.baseUrl}/update/${id}`, user, {
      headers: this._authService.getToken()
    });
  }
}
