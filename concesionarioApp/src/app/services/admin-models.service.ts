import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminModel, modelForm } from 'src/models/adminModels.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminModelsService {

  baseUrl: string = `${environment.urlApi}/admin/brands`;

  public orderColumns: string[] = ['No.', 'Nombre', 'Vehiculos', 'Acciones'];
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
      field: 'vehicles',
      type: 'number',
      noData: true
    }
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }


  getAll(id: number): Observable<AdminModel[]> {
    return this._http.get<AdminModel[]>(`${this.baseUrl}/${id}/models`, {
      headers: this._authService.getToken()
    });
  }

  getById(brandId: number, modelId: number): Observable<modelForm> {
    return this._http.get<modelForm>(`${this.baseUrl}/${brandId}/models/${modelId}`, {
      headers: this._authService.getToken()
    }).pipe(
      map((data) => data[0])
    );
  }

  delete(brandId: number, modelId: number): Observable<AdminModel[]> {
    return this._http.get<AdminModel[]>(`${this.baseUrl}/${brandId}/models/${modelId}/delete`, {
      headers: this._authService.getToken()
    });
  }

  add(brandId: number, model: modelForm): Observable<AdminModel[]> {
    return this._http.post<AdminModel[]>(`${this.baseUrl}/${brandId}/models/add`, model, {
      headers: this._authService.getToken()
    });
  }

  update(brandId: number, modelId: number, model: modelForm): Observable<AdminModel[]> {
    return this._http.put<AdminModel[]>(`${this.baseUrl}/${brandId}/models/${modelId}/update`, model, {
      headers: this._authService.getToken()
    });
  }
}
