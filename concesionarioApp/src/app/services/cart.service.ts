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

  addToCart(product_id: number): void {
    let index = this.cart.findIndex((p) => product_id == p.id);

    if (index >= 0) {
      this.cart[index].amount++;
    } else {
      let new_product: cart_data = {
        id: product_id,
        amount: 1
      };

      this.cart.push(new_product);
    }

    this.save();
  }

  removeFromCart(product_id: number): boolean {
    let index = this.cart.findIndex((p) => product_id == p.id);

    if (index >= 0) {
      this.cart.splice(index, 1);
      this.save();
      return true;
    }

    return false;
  }

  updateAmount(product_id: number, amount: number): void {
    if (amount <= 0) {
      this.removeFromCart(product_id);
    } else {
      let index = this.cart.findIndex((p) => product_id == p.id);

      if (index >= 0) {
        this.cart[index].amount = amount;
      }
    }

    this.save();
  }

}
