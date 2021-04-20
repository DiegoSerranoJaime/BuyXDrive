import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { vehicle, vehicle_card, vehicle_type } from 'src/models/vehicles.model';
import { cart_product } from 'src/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  baseUrl: string = 'http://localhost:3000/api/vehicles';

  constructor(private _http: HttpClient) { }

  getInitVehicles(): Observable<vehicle_card[]> {
    return this._http.get<vehicle_card[]>(`${this.baseUrl}/init`);
  }

  getInitVehiclesByType(type: string): Observable<vehicle_card[]> {
    return this._http.get<vehicle_card[]>(`${this.baseUrl}/type/${type}`);
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
