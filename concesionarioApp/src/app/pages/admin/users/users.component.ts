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
  ];

  constructor(public _adminUsersService: AdminUsersService) {}

  ngOnInit(): void {}
}
