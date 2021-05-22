import { Component, OnInit } from '@angular/core';
import { AdminProvidersService } from 'src/app/services/admin-providers.service';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

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
  ]


  constructor(public _adminProvidersService: AdminProvidersService) {}


  ngOnInit(): void {
  }
}
