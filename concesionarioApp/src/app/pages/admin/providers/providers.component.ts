import { Component, OnInit } from '@angular/core';
import { AdminProvidersService } from 'src/app/services/admin-providers.service';
import { Entity } from 'src/models/entities.models';
import { Permissions } from 'src/models/permissions.model';
import { ProvidersFormComponent } from '../forms/providers-form/providers-form.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  public providersFormComponent = ProvidersFormComponent;
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
    entityInfo: 'proveedor',
    entityText: 'el proveedor'
  };

  constructor(public _adminProvidersService: AdminProvidersService) {}

  ngOnInit(): void {
  }
}
