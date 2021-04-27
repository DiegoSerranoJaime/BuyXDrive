import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { comment } from 'src/models/comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseUrl: string = `${environment.urlApi}/comments`;

  constructor(private _http: HttpClient) { }

  getCommentsOfAProduct(id: number): Observable<comment[]> {
    return this._http.get<comment[]>(`${this.baseUrl}/products/${id}`);
  }
}
