import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CartProduct } from 'src/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string = `${environment.urlApi}/products`;

  constructor(private _http: HttpClient) { }

  getProductCart(id: number): Observable<CartProduct> {
    return this._http.get<CartProduct>(`${this.baseUrl}/cart/${id}`).pipe(
      map((data) => data[0])
    );
  }
}
