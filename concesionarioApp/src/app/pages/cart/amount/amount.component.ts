import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from 'src/app/services/validations.service';

export type ProductUpdate = {
  product: number;
  amount: number;
}

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {

  @Input() amount: number;
  @Input() product: number;
  @Output() update = new EventEmitter<ProductUpdate>();

  amountForm: FormGroup;
  amountInput: FormControl;

  constructor(
    private _validationsService: ValidationsService
  ) { }

  ngOnInit(): void {
    this.formControls();
    this.formGroups();
  }

  formControls(): void {
    this.amountInput = new FormControl(this.amount, [
      Validators.required,
      Validators.min(1)
    ], [
      this._validationsService.amountValidation(this.product)
    ]);
  }

  formGroups(): void {
    this.amountForm = new FormGroup({
      amount: this.amountInput
    });
  }

  incrementAmount() {
    this.amountInput.setValue(this.amountInput.value + 1);
    this.updateAmount();
  }

  decrementAmount() {
    this.amountInput.setValue(this.amountInput.value - 1);
    this.updateAmount();
  }

  updateAmount() {
    if (this.amountForm.valid) {
      let productUpdate: ProductUpdate = {
        product: this.product,
        amount: this.amountInput.value
      };

      this.update.emit(productUpdate);
    }

    this.amountForm.markAllAsTouched();
  }

}
