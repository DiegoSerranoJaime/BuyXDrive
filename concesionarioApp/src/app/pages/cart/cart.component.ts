import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { cart_data, cart_product } from 'src/models/products.model';
import { ProductUpdate } from './amount/amount.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: cart_data[] = [];
  products: cart_product[] = [];

  total_price: number;
  discount_price: number;

  constructor(private _cartService: CartService,
    private _vehicleService: VehiclesService) { }

  ngOnInit(): void {
    this._cartService.getCart().subscribe((cart: cart_data[]) => {
      this.cart = cart;

      this.cart.forEach((cart_data) => {
        this._vehicleService.getVehicleCart(cart_data.id).subscribe((vehicle) => {
          let new_product: cart_product = {
            ...cart_data,
            bname: vehicle.bname,
            mname: vehicle.mname,
            image: vehicle.image,
            price: vehicle.price,
            discount: vehicle.discount
          };

          this.products.push(new_product);

          this.total_price += new_product.price;
          this.discount_price += (new_product.price * new_product.discount) / 100;
        });
      })
    });
  }

  updateAmount(productUpdate: ProductUpdate) {
    this._cartService.updateAmount(productUpdate.product, productUpdate.amount);

    this.products.find((p) => {
      if (p.id === productUpdate.product) {
        p.amount = productUpdate.amount;
      }
    });

  }

  deleteProduct(id: number) {
    this._cartService.removeFromCart(id);

    let index = this.products.findIndex((p) => {
      p.id == id;
    });

    this.products.splice(index, 1);
  }

}
