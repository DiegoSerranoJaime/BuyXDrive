import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminComment } from 'src/models/adminComments.models';
import { Comment } from 'src/models/comments.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCommentsService {

  baseUrl: string = `${environment.urlApi}/admin/comments`;

  public orderColumns: string[] = ['Contador', 'Nombre', 'Email', 'Título', 'Valoración', 'Fecha de publicación', 'Acciones'];
  public orderFields: any[] = [
    {
      field: 'name',
      type: 'string',
      noData: false
    },
    {
      field: 'email',
      type: 'string',
      noData: false
    },
    {
      field: 'title',
      type: 'string',
      noData: false
    },
    {
      field: 'valoration',
      type: 'number',
      noData: false
    },
    {
      field: 'publication_date',
      type: 'date',
      noData: false
    },
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }


  getAll(): Observable<AdminComment[]> {
    return this._http.get<AdminComment[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

  getById(productId: number, userId: number): Observable<Comment> {
    return this._http.get<Comment>(`${this.baseUrl}/product/${productId}/user/${userId}`)
    .pipe(map(c => c[0]));
  }
}
