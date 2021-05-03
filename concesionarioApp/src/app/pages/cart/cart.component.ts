import { Component, OnInit } from '@angular/core';
import { SimpleBodyModalComponent } from 'src/app/components/modals/simple-body-modal/simple-body-modal.component';
import { CartService } from 'src/app/services/cart.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';
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
    private _vehicleService: VehiclesService,
    private _modalService: ModalService,
    private _toastService: ToastService) {
      this.total_price = 0;
      this.discount_price = 0;
    }

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

          this.total_price += new_product.price * new_product.amount;
          this.discount_price += (new_product.price * new_product.amount * new_product.discount) / 100;
        });
      });
    });
  }

  calculatePrice() {
    this.total_price = 0;
    this.discount_price = 0;

    this.products.forEach((product) => {
      this.total_price += product.price * product.amount;
      this.discount_price += (product.price * product.amount * product.discount) / 100;
    });
  }

  updateAmount(productUpdate: ProductUpdate) {
    this._cartService.updateAmount(productUpdate.product, productUpdate.amount);

    this.products.find((p) => {
      if (p.id === productUpdate.product) {
        p.amount = productUpdate.amount;
      }
    });

    this.calculatePrice();
  }

  deleteProduct(index: number) {
    if (index >= 0) {
      this._cartService.removeFromCart(index);
      this.products.splice(index, 1);
      this.calculatePrice();
      return true;
    } else {
      return false;
    }
  }


  public deleteModal(product: cart_product, index: number) {
    this._modalService.show(SimpleBodyModalComponent,
      {
      title: `Eliminar <span class="text-danger">Producto</span>`,
      aceptar: (component) => {
        if(this.deleteProduct(index)) {
          this._toastService.show('Se ha eliminado el producto exitosamente');
        } else {
          this._toastService.show('No se ha podido eliminar el producto');
        }

        this._modalService.hide();
      }},
      {
        body: `¿Estás seguro de que deseas eliminar el producto <span class="text-danger">${product.bname} ${product.mname}</span> de su carrito?`,
      }
    );
  }
}
