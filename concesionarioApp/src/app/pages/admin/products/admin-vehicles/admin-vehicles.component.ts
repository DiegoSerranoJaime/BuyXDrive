import { Component, OnInit } from '@angular/core';
import { AdminVehiclesService } from 'src/app/services/admin-vehicles.service';
import { Entity } from 'src/models/entities.models';
import { Permissions } from 'src/models/permissions.model';
import { VehiclesFormComponent } from '../../forms/vehicles-form/vehicles-form.component';

@Component({
  selector: 'app-admin-vehicles',
  templateUrl: './admin-vehicles.component.html',
  styleUrls: ['./admin-vehicles.component.scss']
})
export class AdminVehiclesComponent implements OnInit {

  public vehiclesFormComponent = VehiclesFormComponent;
  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
    {
      name: 'logicDelete'
    },
    {
      name: 'add'
    },
    {
      name: 'update'
    }
  ];

  public entity: Entity = {
    entityInfo: 'vehículo',
    entityText: 'el vehículo'
  };

  constructor(public _adminVehiclesService: AdminVehiclesService) {}

  ngOnInit(): void {
  }

}
