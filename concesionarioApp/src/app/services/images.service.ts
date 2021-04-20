import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private baseUrl: string = 'http://localhost:3000/api/images';

  constructor(private _http: HttpClient) { }

  getImagesOfAProduct(id: number): Observable<any[]> {
    return this._http.get<any[]>(`${ this.baseUrl }/product/${ id }`);
  }
}
