import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminVehicle } from 'src/models/adminVehicles.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminVehiclesService {
  baseUrl: string = `${environment.urlApi}/admin/vehicles`;

  public orderColumns: string[] = ['No.', 'Marca', 'Modelo', 'Tipo', 'Valoración', 'Precio', 'Cantidad', 'Descuento', 'Acciones'];
  public orderFields: any[] = [
    {
      field: 'id',
      type: 'number',
      noData: false
    },
    {
      field: 'bname',
      type: 'string',
      noData: true
    },
    {
      field: 'mname',
      type: 'string',
      noData: false
    },
    {
      field: 'type',
      type: 'string',
      noData: false
    },
    {
      field: 'val',
      type: 'number',
      noData: false
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
      field: 'discount',
      type: 'percentage',
      noData: false
    },
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }

  getAllVehicles(): Observable<AdminVehicle[]> {
    return this._http.get<AdminVehicle[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

}
