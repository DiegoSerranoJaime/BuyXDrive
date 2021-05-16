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
  @Output() valorationEmit = new EventEmitter<number[]>();
  @Output() productsPerPageEmit = new EventEmitter<number>();

  @Input() brands: any[];
  @Input() types: any[];
  @Input() maxPrice: number;
  @Input() title: string;

  collapse: boolean = false;

  priceOptions: Options;
  valorationOptions: Options;

  selectedBrands: any[] = [];
  selectedTypes: any[] = [];

  productsPerPage: number[] = [4, 8, 12, 16];

  constructor() { }

  ngOnInit(): void {
    this.priceOptions = {
      minLimit: 0,
      maxLimit: this.maxPrice,
      floor: 0,
      ceil: this.maxPrice,
      tickStep: this.maxPrice / 5,
      showTicks: true,
      minRange: 1,
      noSwitching: true,
      autoHideLimitLabels: true,
      translate: (value: number): string => {
        return value + ' €';
      }
    };

    this.valorationOptions = {
      minLimit: 0,
      maxLimit: 5,
      floor: 0,
      ceil: 5,
      tickStep: 1,
      showTicks: true,
      step: 1,
      minRange: 1,
      noSwitching: true,
      autoHideLimitLabels: true,
    };
  }

  filterByName(name: string) {
    this.nameEmit.emit(name);
  }

  filterByPrice(price: any) {
    this.priceEmit.emit([price.value, price.highValue]);
  }

  filterByValoration(valoration: any) {
    this.valorationEmit.emit([valoration.value, valoration.highValue]);
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

  emitProductsPerPage(amount: number) {
    this.productsPerPageEmit.emit(amount)
  }
}
