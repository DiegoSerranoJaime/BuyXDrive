import { Component, OnInit } from '@angular/core';
import { AdminUsersService } from 'src/app/services/admin-users.service';
import { Permissions } from 'src/models/permissions.model';
import { UserFormComponent } from '../forms/user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public userFormComponent = UserFormComponent;
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
    },
    {
      name: 'add'
    },
    {
      name: 'update'
    }
  ];

  constructor(public _adminUsersService: AdminUsersService) {}

  ngOnInit(): void {}
}
