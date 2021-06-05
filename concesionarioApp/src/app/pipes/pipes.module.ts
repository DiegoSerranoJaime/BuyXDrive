import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountPipe } from './discount.pipe';
import { FilterProductsPipe } from './filter-products.pipe';



@NgModule({
  declarations: [
    DiscountPipe,
    FilterProductsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DiscountPipe,
    FilterProductsPipe
  ]
})
export class PipesModule { }
