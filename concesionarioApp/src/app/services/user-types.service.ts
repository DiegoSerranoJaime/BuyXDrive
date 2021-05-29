import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTypesService {

  baseUrl: string = `${environment.urlApi}/user/types`;

  constructor(private _http: HttpClient) { }

  getAllEmployerTypes(): Observable<any[]> {
    return this._http.get<any[]>(this.baseUrl);
  }
}
