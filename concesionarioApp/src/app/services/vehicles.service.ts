import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { vehicle, vehicle_card, vehicle_type } from 'src/models/vehicles.model';
import { cart_product } from 'src/models/products.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  baseUrl: string = `${environment.urlApi}/vehicles`;

  constructor(private _http: HttpClient) { }

  getInitVehicles(): Observable<vehicle_card[]> {
    return this._http.get<vehicle_card[]>(`${this.baseUrl}/init`);
  }

  getInitVehiclesByType(type: string, id: number): Observable<vehicle_card[]> {
    return this._http.get<vehicle_card[]>(`${this.baseUrl}/type/${type}/selected_vehicle/${id}`);
  }

  getVehicle(id: number): Observable<vehicle> {
    return this._http.get<vehicle>(`${this.baseUrl}/${id}`).pipe(
      map((data) => data[0])
    );
  }

  getVehicleCart(id: number): Observable<cart_product> {
    return this._http.get<cart_product>(`${this.baseUrl}/cart/${id}`).pipe(
      map((data) => data[0])
    );
  }

  getVehicleTypes(): Observable<vehicle_type> {
    return this._http.get<vehicle_type>(`${this.baseUrl}/type`);
  }
}
