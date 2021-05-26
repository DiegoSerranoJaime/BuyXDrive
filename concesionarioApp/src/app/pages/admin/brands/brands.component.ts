import { Component, OnInit } from '@angular/core';
import { AdminBrandsService } from 'src/app/services/admin-brands.service';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
    {
      name: 'delete'
    }
  ];

  constructor(public _adminBrandsService: AdminBrandsService) {}

  ngOnInit(): void {}

}
