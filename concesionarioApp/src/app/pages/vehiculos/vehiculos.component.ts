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
  selectedCv: number[] = [];
  selectedDoors: number[] = [];
  selectedSeating: number[] = [];

  allFilterData = false;
  brands: any[] = [];
  types: any[] = [];
  maxPrice: number = 0;
  maxCv: number = 0;
  maxDoors: number = 0;
  maxSeating: number = 0;

  vehiculos: VehicleCard[] = [];

  page: number = 1;
  pageSize: number = 16;

  constructor(private _vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this._vehiclesService.getAllVehicles().subscribe((res) => {
      this.vehiculos = res;
    });

    combineLatest(this._vehiclesService.getVehiclesBrands(), this._vehiclesService.getVehiclesTypes(), this._vehiclesService.getVehiclesMaxPrice(),
    this._vehiclesService.getVehiclesMaxCv(), this._vehiclesService.getVehiclesMaxDoors(), this._vehiclesService.getVehiclesMaxSeating())
    .subscribe(([brands, types, price, cv, doors, seating]) => {
      this.brands = brands;
      this.types = types;
      this.maxPrice = Math.ceil(price['maxPrice']);
      this.allFilterData = true;
      this.maxCv = cv['maxCv'];
      this.maxDoors = doors['maxDoors'];
      this.maxSeating = seating['maxSeating'];
    });
  }

  filterName(event: any) {
    this.name = event;
  }

  filterPrice(event: any) {
    this.prices = event;
  }

  filterCv(event: any) {
    this.selectedCv = event;
  }

  filterDoors(event: any) {
    this.selectedDoors = event;
  }

  filterSeating(event: any) {
    this.selectedSeating = event;
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
