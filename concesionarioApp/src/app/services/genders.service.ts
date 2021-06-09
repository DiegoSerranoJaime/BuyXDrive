import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GendersService {

  baseUrl: string = `${environment.urlApi}/user/genders`;

  constructor(private _http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this._http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/${id}`)
      .pipe(map((g) => g[0]));
  }
}
