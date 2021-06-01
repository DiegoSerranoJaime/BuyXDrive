import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts',
  pure: false
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: any[], name: string, prices: number[], brands: any[], types: any[], valoration: number[], cv?: number[], doors?: number[], seating?: number[]): any[] {
    let res: any[] = [];

    res = products.filter((v) => {
      let ret: boolean = true;

      if (name && !v.name.toLowerCase().includes(name.toLocaleLowerCase())) {
        ret = false;
      } else if (Number(v.price) < prices[0] || Number(v.price) > prices[1]) {
        ret = false;
      } else if ((Number(v.val) < valoration[0] || Number(v.val) > valoration[1])) {
        ret = false;
      }
      
      if (v.cv && cv && (Number(v.cv) < cv[0] || Number(v.cv) > cv[1])) {
        ret = false;
      } else if (v.doors && doors && (Number(v.doors) < doors[0] || Number(v.doors) > doors[1])) {
        ret = false;
      } else if (v.seating && seating && (Number(v.seating) < seating[0] || Number(v.seating) > seating[1])) {
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

    if (name || brands.length > 0 || types.length > 0 || prices.length > 0 || valoration.length > 0 || 
      (cv && cv.length > 0) ||(doors && doors.length > 0) || (seating && seating.length > 0)) {
      return res;
    } else {
      return products;
    }

  }

}
