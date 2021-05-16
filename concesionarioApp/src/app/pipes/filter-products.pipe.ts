import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts',
  pure: false
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: any[], name: string, prices: number[], brands: any[], types: any[], valoration: number[]): any[] {
    let res: any[] = [];

    res = products.filter((v) => {
      let ret: boolean = true;

      if (name && !v.name.toLowerCase().includes(name)) {
        ret = false;
      } else if (Number(v.price) < prices[0] || Number(v.price) > prices[1]) {
        ret = false;
      } else if (Number(v.val) < valoration[0] || Number(v.val) > valoration[1]) {
        ret = false;
      }

      let b = brands.some((b) => b.name == v.bname);
      let t = types.some((t) => t.name == v.type);

      if(brands.length > 0 && !b) {
        ret = false;
      }

      if(types.length > 0 && !t) {
        ret = false;
      }

      return ret ? v : null;
    });

    if (name || brands.length > 0 || types.length > 0 || prices.length > 0 || valoration.length > 0) {
      return res;
    } else {
      return products;
    }

  }

}
