import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { vehicle_card } from 'src/models/vehicles.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public vehicles: vehicle_card[] = [];

  constructor(private _vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this._vehiclesService.getInitVehicles().subscribe((vehicles: vehicle_card[]) => {
      this.vehicles = vehicles;
    });
  }

}
