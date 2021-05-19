import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminUsersService } from 'src/app/services/admin-users.service';
import { AdminUsers } from 'src/models/adminUsers.model';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
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

    this._adminUsersService.getAllUsers().subscribe((users) => {
      this.dataSource.data = users;
    });
  }
}
