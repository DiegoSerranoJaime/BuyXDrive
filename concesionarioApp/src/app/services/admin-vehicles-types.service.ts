import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminVehiclesTypes, VehicleTypeForm } from 'src/models/adminVehiclesTypes.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminVehiclesTypesService {
  baseUrl: string = `${environment.urlApi}/admin/vehiclesTypes`;

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
      noData: false
    },
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }


  getAll(): Observable<AdminVehiclesTypes[]> {
    return this._http.get<AdminVehiclesTypes[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

  getById(id: number): Observable<VehicleTypeForm> {
    return this._http.get<VehicleTypeForm>(`${this.baseUrl}/${id}`, {
      headers: this._authService.getToken()
    }).pipe(
      map((data) => data[0])
    );
  }

  delete(id: number): Observable<AdminVehiclesTypes[]> {
    return this._http.get<AdminVehiclesTypes[]>(`${this.baseUrl}/delete/${id}`, {
      headers: this._authService.getToken()
    });
  }

  add(vehicleType: VehicleTypeForm): Observable<AdminVehiclesTypes[]> {
    return this._http.post<AdminVehiclesTypes[]>(`${this.baseUrl}/add`, vehicleType, {
      headers: this._authService.getToken()
    });
  }

  update(id: number, vehicleType: VehicleTypeForm): Observable<AdminVehiclesTypes[]> {
    return this._http.put<AdminVehiclesTypes[]>(`${this.baseUrl}/update/${id}`, vehicleType, {
      headers: this._authService.getToken()
    });
  }
}
