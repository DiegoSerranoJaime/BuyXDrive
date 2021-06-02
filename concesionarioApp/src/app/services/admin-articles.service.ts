import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminArticle, ArticleForm } from 'src/models/adminArticles.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminArticlesService {
  baseUrl: string = `${environment.urlApi}/admin/articles`;

  public orderColumns: string[] = ['No.', 'Marca', 'Nombre', 'Tipo', 'Valoración', 'Precio', 'Cantidad', 'Descuento', 'Activo', 'Acciones'];
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
      field: 'aname',
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
    {
      field: 'active',
      type: 'boolean',
      noData: false
    }
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }

  getAll(): Observable<AdminArticle[]> {
    return this._http.get<AdminArticle[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

  getById(id: number): Observable<ArticleForm> {
    return this._http.get<ArticleForm>(`${this.baseUrl}/${id}`, {
      headers: this._authService.getToken()
    }).pipe(map((a) => a[0]));
  }

  delete(id: number): Observable<AdminArticle[]> {
    return this._http.get<AdminArticle[]>(`${this.baseUrl}/delete/${id}`, {
      headers: this._authService.getToken()
    });
  }

  logicDelete(id: number): Observable<AdminArticle[]> {
    return this._http.get<AdminArticle[]>(`${this.baseUrl}/logicDelete/${id}`, {
      headers: this._authService.getToken()
    });
  }

  reactive(id: number): Observable<AdminArticle[]> {
    return this._http.get<AdminArticle[]>(`${this.baseUrl}/reactive/${id}`, {
      headers: this._authService.getToken()
    });
  }

  getAllBrands(): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/brands`, {
      headers: this._authService.getToken()
    });
  }

  getAllTypes(): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/types`, {
      headers: this._authService.getToken()
    });
  }
}

