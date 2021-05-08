import { Component, OnInit } from '@angular/core';
import { SimpleBodyModalComponent } from 'src/app/components/modals/simple-body-modal/simple-body-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ModalService } from 'src/app/services/modal.service';
import { OrdersService } from 'src/app/services/orders.service';
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

  totalPrice: number;
  discountPrice: number;

  constructor(private _cartService: CartService,
    private _vehicleService: VehiclesService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    public _authService: AuthService,
    private _ordersService: OrdersService) {
      this.totalPrice = 0;
      this.discountPrice = 0;
    }

  ngOnInit(): void {
    this._cartService.getCart().subscribe((cart: cart_data[]) => {
      this.cart = cart;

      this.cart.forEach((cart_data) => {
        this._vehicleService.getVehicleCart(cart_data.id).subscribe((vehicle) => {
          let new_product: cart_product = {
            ...cart_data,
            name: vehicle.name,
            image: vehicle.image,
            price: vehicle.price,
            discount: vehicle.discount
          };

          this.products.push(new_product);

          this.totalPrice += new_product.price * new_product.amount;
          this.discountPrice += (new_product.price * new_product.amount * new_product.discount) / 100;
        });
      });
    });
  }

  calculatePrice() {
    this.totalPrice = 0;
    this.discountPrice = 0;

    this.products.forEach((product) => {
      this.totalPrice += product.price * product.amount;
      this.discountPrice += (product.price * product.amount * product.discount) / 100;
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
        body: `¿Estás seguro de que deseas eliminar el producto <span class="text-danger">${product.name}</span> de su carrito?`,
      }
    );
  }

  public buyProducts() {
    this._modalService.show(SimpleBodyModalComponent,
      {
        title: `Realizar <span class="text-danger">Compra</span>`,
        aceptar: (component) => {
          this._ordersService.buyProducts(this.products).subscribe((data) => {
            this.clean();
            this._cartService.clean();
            this._modalService.hide();
            this._toastService.show(`Se ha creado un nuevo pedido con el código ${data}`);
          });
        }
      },
      {
        body: `<p>¿Estas seguro de que deseas realizar la compra de los próximos productos?</p>
        <p class="text-danger">Una vez se realice solo se podrá cancelar mientras su estado sea pendiente</p>`
      });
  }

  clean() {
    this.products = [];
    this.totalPrice = 0;
    this.discountPrice= 0
  }

  disableBuy() {
    return this._authService.isAuthenticated() && this.products.length > 0 ? false : true;
  }
}
