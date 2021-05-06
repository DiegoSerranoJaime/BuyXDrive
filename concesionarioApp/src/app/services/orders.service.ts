import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    private _authService: AuthService,
    private _cartService: CartService,
    private _modalService: ModalService,
    private _toastService: ToastService) { }

  buyProducts(products: cart_product[]) {
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
        }).subscribe(() => {
          this._cartService.clean();
          this._modalService.hide();
          this._toastService.show(`Se ha creado un nuevo pedido con el código ${data.order_id}`);
        });
      });
    });
  }
}
