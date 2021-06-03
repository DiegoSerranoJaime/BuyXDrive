import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private baseUrl: string = `${ environment.urlApi }/images`;
  private productUrl: string = `${ environment.urlApi }/admin/products`;

  constructor(private _http: HttpClient) { }

  getImagesOfAProduct(id: number): Observable<any[]> {
    return this._http.get<any[]>(`${ this.baseUrl }/product/${ id }`);
  }

  getImage(name: string): Observable<any>{
    return this._http.get<any>(`${ this.baseUrl }/${name}`);
  }

  uploadImage(id: number, image: any): Observable<any> {
    return this._http.post(`${this.productUrl}/${id}/image`, image);
  }
}
