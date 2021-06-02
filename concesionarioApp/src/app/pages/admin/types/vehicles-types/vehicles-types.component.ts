import { Component, OnInit } from '@angular/core';
import { AdminVehiclesTypesService } from 'src/app/services/admin-vehicles-types.service';
import { Permissions } from 'src/models/permissions.model';
import { VehiclesTypesFormComponent } from '../../forms/vehicles-types-form/vehicles-types-form.component';

@Component({
  selector: 'app-vehicles-types',
  templateUrl: './vehicles-types.component.html',
  styleUrls: ['./vehicles-types.component.scss']
})
export class VehiclesTypesComponent implements OnInit {

  public vehiclesTypesFormComponent = VehiclesTypesFormComponent;
  public permisos: Permissions[] = [
    {
      name: 'delete'
    },
    {
      name: 'add'
    },
    {
      name: 'update'
    }
  ]

  constructor(public _adminVehiclesTypesService: AdminVehiclesTypesService) {}

  ngOnInit(): void {
  }
}
