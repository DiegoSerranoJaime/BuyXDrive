import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { VehicleCard } from 'src/models/vehicles.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public vehicles: VehicleCard[] = [];

  constructor(private _vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this._vehiclesService.getInitVehicles().subscribe((vehicles: VehicleCard[]) => {
      this.vehicles = vehicles;
    });
  }

}
