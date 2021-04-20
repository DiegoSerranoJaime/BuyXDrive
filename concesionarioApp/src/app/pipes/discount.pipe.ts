import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(price: number, discount: number): number {
    return discount > 0 ? price*((100 - discount)/100) : price;
  }

}
