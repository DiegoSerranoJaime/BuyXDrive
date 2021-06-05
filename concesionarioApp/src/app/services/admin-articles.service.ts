import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminArticle, ArticleForm } from 'src/models/adminArticles.models';
import { AuthService } from './auth.service';
import { ImagesService } from './images.service';

@Injectable({
  providedIn: 'root'
})
export class AdminArticlesService {
  baseUrl: string = `${environment.urlApi}/admin/articles`;
  productUrl: string = `${environment.urlApi}/products`;

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
    private _authService: AuthService,
    private _imagesService: ImagesService) { }

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

  add(form: any): Observable<AdminArticle[]> {
    const product = {
      price: form.price,
      amount: form.amount,
      discount: form.discount,
      description: form.description,
    };
    
    let subject = new Subject<any>();

    this._http.post<any>(`${this.productUrl}/add`, product, {
      headers: this._authService.getToken()
    }).subscribe((data) => {
      if (data.ok) {
        const article = {
          id: data.data,
          name: form.name,
          type: form.type,
          brand: form.brand,
        };

        this._http.post<any>(`${this.baseUrl}/add`, article, {
          headers: this._authService.getToken()
        }).subscribe(() => {
          this.getAll().subscribe((data) => {
            subject.next({
              ok: true,
              data: data
            });
          });
        });

        const imagesData = form.images as File[];
        
        for(let i = 0; i < imagesData.length; i++) {
          this._imagesService.uploadImage(article.id, imagesData[i]).subscribe();

        }
      }
    }); 

    return subject;
  }

  update(id: number, form: any): Observable<AdminArticle[]> {
    const product = {
      price: form.price,
      amount: form.amount,
      discount: form.discount,
      description: form.description,
    };
    
    let subject = new Subject<any>();

    this._http.put<any>(`${this.productUrl}/update/${id}`, product, {
      headers: this._authService.getToken()
    }).subscribe((data) => {
      if (data.ok) {
        const article = {
          id: id,
          name: form.name,
          type: form.type,
          brand: form.brand,
        };

        this._http.put<any>(`${this.baseUrl}/update/:id`, article, {
          headers: this._authService.getToken()
        }).subscribe(() => {
          this.getAll().subscribe((data) => {
            subject.next({
              ok: true,
              data: data
            });
          });
        });
      }
    }); 

    return subject;
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

