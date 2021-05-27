import { Component, OnInit } from '@angular/core';
import { AdminBrandsService } from 'src/app/services/admin-brands.service';
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

  constructor(public _adminBrandsService: AdminBrandsService) {}

  ngOnInit(): void {}

}
