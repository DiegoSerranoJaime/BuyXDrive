import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article, ArticleCard } from 'src/models/articles.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  baseUrl: string = `${environment.urlApi}/articles`;

  constructor(private _http: HttpClient) { }

  getAllArticles(): Observable<ArticleCard[]> {
    return this._http.get<ArticleCard[]>(`${this.baseUrl}`);
  }

  getInitArticles(): Observable<ArticleCard[]> {
    return this._http.get<ArticleCard[]>(`${this.baseUrl}/init`);
  }

  getInitArticlesByType(type: string, id: number): Observable<ArticleCard[]> {
    return this._http.get<ArticleCard[]>(`${this.baseUrl}/types/${type}/selected_article/${id}`);
  }

  getArticle(id: number): Observable<Article> {
    return this._http.get<Article>(`${this.baseUrl}/${id}`).pipe(
      map((data) => data[0])
    );
  }

  getArticlesTypes(): Observable<any[]> {
    return this._http.get<any[]>(`${this.baseUrl}/types`);
  }

  getArticlesBrands(): Observable<any[]> {
    return this._http.get<any[]>(`${this.baseUrl}/brands`);
  }

  getArticlesMaxPrice(): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/maxPrice`).pipe(
      map((p) => p[0])
    );
  }
}
