import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private baseUrl: string = `${ environment.urlApi }/images`;
  private productUrl: string = `${ environment.urlApi }/admin/products`;

  constructor(private _http: HttpClient) { }

  getImagesOfAProduct(id: number): Observable<any[]> {
    return this._http.get<any[]>(`${ this.baseUrl }/product/${ id }`);
  }

  getImage(name: string): Observable<any>{
    return this._http.get<any>(`${ this.baseUrl }/${name}`);
  }

  uploadImage(id: number, image: any): Observable<any> {
    const formData = new FormData();
    formData.append('image', image, image.name);

    return this._http.post(`${this.productUrl}/${id}/image`, formData);
  }

  delete(id: number, images: any[]): Observable<any> {
    let subject = new Subject<any[]>();

    for(let i = 0; i < images.length; i++) {
      this._http.get<any[]>(`${this.baseUrl}/product/${id}/image/${images[i]}`).subscribe((data) => {
        if (i === (images.length - 1)) {
          subject.next(data);
        }
      })
    }

    return subject;
  }
}
