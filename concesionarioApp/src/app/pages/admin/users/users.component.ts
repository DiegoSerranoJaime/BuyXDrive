import { Component, OnInit } from '@angular/core';
import { AdminUsersService } from 'src/app/services/admin-users.service';
import { Entity } from 'src/models/entities.models';
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

  public entity: Entity = {
    entityInfo: 'usuario',
    entityText: 'el usuario'
  };

  constructor(public _adminUsersService: AdminUsersService) {}

  ngOnInit(): void {}
}
