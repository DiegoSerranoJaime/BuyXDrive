import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminVehiclesService } from 'src/app/services/products/admin-vehicles.service';
import { AdminVehicle } from 'src/models/adminVehicles.model';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-admin-vehicles',
  templateUrl: './admin-vehicles.component.html',
  styleUrls: ['./admin-vehicles.component.scss']
})
export class AdminVehiclesComponent implements OnInit {

  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
    {
      name: 'delete'
    },
    {
      name: 'logicDelete'
    }
  ]

  constructor(public _adminVehiclesService: AdminVehiclesService) {}

  ngOnInit(): void {
  }

}
