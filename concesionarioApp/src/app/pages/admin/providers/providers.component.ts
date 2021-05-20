import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminProvidersService } from 'src/app/services/admin-providers.service';
import { AdminProvider } from 'src/models/adminProviders.models';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  public displayedColumns: string[] = [];
  public displayedData: any[] = [];
  public dataSource = new MatTableDataSource<AdminProvider>();
  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _adminProvidersService: AdminProvidersService) {}


  ngOnInit(): void {
    this.displayedColumns = this._adminProvidersService.orderColumns;
    this.displayedData = this._adminProvidersService.orderFields;

    this._adminProvidersService.getAllProviders().subscribe((providers) => {
      this.dataSource.data = providers;
    });
  }
}
