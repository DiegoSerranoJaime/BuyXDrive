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

  public displayedColumns: string[] = [];
  public displayedData: any[] = [];
  public dataSource = new MatTableDataSource<AdminVehicle>();
  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _adminVehiclesService: AdminVehiclesService) {}


  ngOnInit(): void {
    this.displayedColumns = this._adminVehiclesService.orderColumns;
    this.displayedData = this._adminVehiclesService.orderFields;

    this._adminVehiclesService.getAllVehicles().subscribe((vehicles) => {
      this.dataSource.data = vehicles;
    });
  }

}
