import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-buy-button',
  templateUrl: './buy-button.component.html',
  styleUrls: ['./buy-button.component.scss']
})
export class BuyButtonComponent implements OnInit, OnChanges {

  @Input() product: number

  @Output() addToCart = new EventEmitter<boolean>();

  form: FormGroup;

  constructor(private _validationsService: ValidationsService) { }

  ngOnInit(): void {}

  ngOnChanges() {
    this.form = new FormGroup({},[],[
      this._validationsService.stockValidation(this.product)
    ]);
  } 

  addProduct() {
    this.addToCart.emit(true);
  }
}
