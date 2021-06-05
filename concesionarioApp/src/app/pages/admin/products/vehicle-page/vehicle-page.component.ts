import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { Vehicle } from 'src/models/vehicles.model';

@Component({
  selector: 'app-vehicle-page',
  templateUrl: './vehicle-page.component.html',
  styleUrls: ['./vehicle-page.component.scss']
})
export class VehiclePageComponent implements OnInit {

  public id: number;
  public vehicle: Vehicle;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _vehiclesService: VehiclesService,

  ) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params.id;

    this._vehiclesService.getVehicle(this.id).subscribe((vehicle) => {
      this.vehicle = vehicle;
    })
  }

}
