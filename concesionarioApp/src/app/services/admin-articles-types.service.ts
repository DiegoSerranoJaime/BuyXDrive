import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AdminArticlesTypes, ArticleTypeForm } from '../../models/adminArticlesTypes.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminArticlesTypesService {
  baseUrl: string = `${environment.urlApi}/admin/articlesTypes`;

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


  getAll(): Observable<AdminArticlesTypes[]> {
    return this._http.get<AdminArticlesTypes[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

  getById(id: number): Observable<ArticleTypeForm> {
    return this._http.get<ArticleTypeForm>(`${this.baseUrl}/${id}`, {
      headers: this._authService.getToken()
    }).pipe(
      map((data) => data[0])
    );
  }

  delete(id: number): Observable<AdminArticlesTypes[]> {
    return this._http.get<AdminArticlesTypes[]>(`${this.baseUrl}/delete/${id}`, {
      headers: this._authService.getToken()
    });
  }

  add(articleType: ArticleTypeForm): Observable<AdminArticlesTypes[]> {
    return this._http.post<AdminArticlesTypes[]>(`${this.baseUrl}/add`, articleType, {
      headers: this._authService.getToken()
    });
  }

  update(id: number, articleType: ArticleTypeForm): Observable<AdminArticlesTypes[]> {
    return this._http.put<AdminArticlesTypes[]>(`${this.baseUrl}/update/${id}`, articleType, {
      headers: this._authService.getToken()
    });
  }
}
