import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment, CommentSend } from 'src/models/comments.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseUrl: string = `${environment.urlApi}/comments`;

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }

  getCommentsOfAProduct(id: number): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this.baseUrl}/products/${id}`);
  }

  insertCommentOfAProduct(comment: CommentSend): Observable<any> {
    return this._http.post(`${this.baseUrl}/products`, comment, {
      headers: this._authService.getToken()
    });
  }
}
