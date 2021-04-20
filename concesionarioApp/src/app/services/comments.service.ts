import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comment } from 'src/models/comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseUrl: string = "http://localhost:3000/api/comments";

  constructor(private _http: HttpClient) { }

  getCommentsOfAProduct(id: number): Observable<comment[]> {
    return this._http.get<comment[]>(`${this.baseUrl}/products/${id}`);
  }
}
