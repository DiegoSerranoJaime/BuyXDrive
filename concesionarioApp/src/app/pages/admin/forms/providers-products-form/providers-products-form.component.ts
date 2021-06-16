import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminProvidersProductsService } from 'src/app/services/admin-providers-products.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProviderPorductForm } from 'src/models/adminProvidersProducts.models';

@Component({
  selector: 'app-providers-products-form',
  templateUrl: './providers-products-form.component.html',
  styleUrls: ['./providers-products-form.component.scss']
})
export class ProvidersProductsFormComponent implements OnInit {

  public data: any;
  public product: ProviderPorductForm;

  public products: any[] = [];

  public form: FormGroup;
  public productId: FormControl;
  public price: FormControl;
  public amount: FormControl;

  constructor(private _productsService: ProductsService) { }

  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe((products) => {
      this.products = products
    })

    this.buildFormControls();
    this.buildFormGroup();
  }

  buildFormControls() {
    this.productId = new FormControl(this.product ? this.product.product_id : '', [
      Validators.required
    ]);
    
    this.price = new FormControl(this.product ? this.product.price : '', [
      Validators.required,
      Validators.min(0),
      Validators.max(9999999999999.99)
    ]);

    this.amount = new FormControl(this.product ? this.product.amount : '', [
      Validators.required,
      Validators.min(0)
    ]);  
  }

  buildFormGroup() {
    this.form = new FormGroup({
      productId: this.productId,
      price: this.price,
      amount: this.amount,
    });
  }
}
