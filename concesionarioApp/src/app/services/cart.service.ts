import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { cart_data } from 'src/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: cart_data[] = [];

  constructor() {
    this.load();
  }

  load(): void {
    if(localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
  }

  save(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCart(): Observable<cart_data[]> {
    return of(this.cart);
  }

  addToCart(product_id: number): boolean {
    let index = this.cart.findIndex((p) => product_id == p.id);
    let exist: boolean;

    if (index >= 0) {
      this.cart[index].amount++;
      exist = true;
    } else {
      let new_product: cart_data = {
        id: product_id,
        amount: 1
      };

      this.cart.push(new_product);
      exist = false;
    }

    this.save();
    return exist;
  }

  removeFromCart(index: number): boolean {
    this.cart.splice(index, 1);
    return true;
  }

  updateAmount(product_id: number, amount: number): void {
    let index = this.cart.findIndex((p) => product_id == p.id);

    if (index >= 0) {
      this.cart[index].amount = amount;
    }

    this.save();
  }

}
