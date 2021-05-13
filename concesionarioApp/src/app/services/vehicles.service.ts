import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicle, VehicleCard } from 'src/models/vehicles.model';
import { CartProduct } from 'src/models/products.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  baseUrl: string = `${environment.urlApi}/vehicles`;

  constructor(private _http: HttpClient) { }

  getAllVehicles(): Observable<VehicleCard[]> {
    return this._http.get<VehicleCard[]>(`${this.baseUrl}`);
  }

  getInitVehicles(): Observable<VehicleCard[]> {
    return this._http.get<VehicleCard[]>(`${this.baseUrl}/init`);
  }

  getInitVehiclesByType(type: string, id: number): Observable<VehicleCard[]> {
    return this._http.get<VehicleCard[]>(`${this.baseUrl}/types/${type}/selected_vehicle/${id}`);
  }

  getVehicle(id: number): Observable<Vehicle> {
    return this._http.get<Vehicle>(`${this.baseUrl}/${id}`).pipe(
      map((data) => data[0])
    );
  }

  getVehicleCart(id: number): Observable<CartProduct> {
    return this._http.get<CartProduct>(`${this.baseUrl}/cart/${id}`).pipe(
      map((data) => data[0])
    );
  }

  getVehiclesTypes(): Observable<any[]> {
    return this._http.get<any[]>(`${this.baseUrl}/types`);
  }

  getVehiclesBrands(): Observable<any[]> {
    return this._http.get<any[]>(`${this.baseUrl}/brands`);
  }
}
