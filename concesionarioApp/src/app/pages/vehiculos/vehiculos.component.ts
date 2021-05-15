import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { VehicleCard } from 'src/models/vehicles.model';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {

  name: string;
  prices: number[] = [];
  valoration: number[] = [];
  selectedBrands: any[] = [];
  selectedTypes: any[] = [];

  allFilterData = false;
  brands: any[] = [];
  types: any[] = [];
  maxPrice: number = 0;

  vehiculos: VehicleCard[] = [];

  page: number = 1;
  pageSize: number = 16;

  constructor(private _vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this._vehiclesService.getAllVehicles().subscribe((res) => {
      this.vehiculos = res;
    });

    combineLatest(this._vehiclesService.getVehiclesBrands(), this._vehiclesService.getVehiclesTypes(), this._vehiclesService.getVehiclesMaxPrice())
    .subscribe(([brands, types, price]) => {
      this.brands = brands;
      this.types = types;
      this.maxPrice = Math.ceil(price['maxPrice']);
      this.allFilterData = true;
    });
  }

  filterName(event: any) {
    this.name = event;
  }

  filterPrice(event: any) {
    this.prices = event;
  }

  filterBrands(event: any[]) {
    if (event.length > 0) {
      this.selectedBrands = event;
    } else {
      this.selectedBrands = [];
    }
  }

  filterTypes(event: any[]) {
    if (event.length > 0) {
      this.selectedTypes = event;
    } else {
      this.selectedTypes = [];
    }
  }

  filterValoration(event: any) {
    this.valoration = event;
  }

  productsPerPage(event: any) {
    this.pageSize = event;
  }
}
