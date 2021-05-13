import { Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() nameEmit = new EventEmitter<string>();
  @Output() priceEmit = new EventEmitter<number[]>();
  @Output() brandsEmit = new EventEmitter<string[]>();
  @Output() typesEmit = new EventEmitter<string[]>();

  @Input() brands: any[];
  @Input() types: any[];
  @Input() maxPrice: number;

  collapse: boolean = false;

  options: Options;

  selectedBrands: any[] = [];
  selectedTypes: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.options = {
      minLimit: 0,
      maxLimit: this.maxPrice,
      floor: 0,
      ceil: this.maxPrice,
      tickStep: this.maxPrice / 5,
      showTicks: true,
      step: 1000,
      minRange: 1,
      noSwitching: true,
      autoHideLimitLabels: true,
      translate: (value: number): string => {
        return value + ' €';
      }
    }
  }

  filterByName(name: string) {
    this.nameEmit.emit(name);
  }

  filterByPrice(price: any) {
    this.priceEmit.emit([price.value, price.highValue]);
  }

  filterByBrands(brand: any) {
    let index = this.selectedBrands.findIndex((b) => b.name == brand.name);

    if (index >= 0) {
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brand);
    }

    this.brandsEmit.emit(this.selectedBrands);
  }

  filterByTypes(type: any) {
    let index = this.selectedTypes.findIndex((b) => b.name == type.name);

    if (index >= 0) {
      this.selectedTypes.splice(index, 1);
    } else {
      this.selectedTypes.push(type);
    }

    this.typesEmit.emit(this.selectedTypes);
  }

}
