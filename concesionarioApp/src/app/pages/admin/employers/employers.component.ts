import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminUsersService } from 'src/app/services/admin-users.service';
import { AdminUsers } from 'src/models/adminUsers.model';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss']
})
export class EmployersComponent implements OnInit {

  public displayedColumns: string[] = [];
  public displayedData: any[] = [];
  public dataSource = new MatTableDataSource<AdminUsers>();
  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _adminUsersService: AdminUsersService) {}


  ngOnInit(): void {
    this.displayedColumns = this._adminUsersService.orderColumns;
    this.displayedData = this._adminUsersService.orderFields;

    this._adminUsersService.getAllEmployers().subscribe((users) => {
      this.dataSource.data = users;
    });
  }
}
