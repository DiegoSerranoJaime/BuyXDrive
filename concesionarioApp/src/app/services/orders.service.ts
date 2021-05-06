import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cart_product } from 'src/models/products.model';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { ModalService } from './modal.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl: string = `${ environment.urlApi }/orders`;

  constructor(private _http: HttpClient,
    private _authService: AuthService) { }

  buyProducts(products: cart_product[]): Observable<string> {
    let order = new Subject<string>();

    this._http.post(this.baseUrl, {}, {
      headers: this._authService.getToken()
    }).subscribe((data: any) => {
      products.forEach((product) => {

        let dataEnvio = {
          order_id: data.order_id,
          product_id: product.id,
          amount: product.amount,
          price: product.price,
          discount: product.discount
        };

        this._http.post(`${this.baseUrl}/product`, dataEnvio, {
          headers: this._authService.getToken()
        }).subscribe();
      });

      order.next(data.order_id);
    });

    return order;
  }
}
