import { Component, OnInit } from '@angular/core';
import { AdminBrandsService } from 'src/app/services/admin-brands.service';
import { Entity } from 'src/models/entities.models';
import { Permissions } from 'src/models/permissions.model';
import { BrandsFormComponent } from '../forms/brands-form/brands-form.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  public brandsFormComponent = BrandsFormComponent;
  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
    {
      name: 'delete'
    },
    {
      name: 'add'
    },
    {
      name: 'update'
    }
  ];

  public entity: Entity = {
    entityInfo: 'marca',
    entityText: 'la marca'
  };

  constructor(public _adminBrandsService: AdminBrandsService) {}

  ngOnInit(): void {}

}
