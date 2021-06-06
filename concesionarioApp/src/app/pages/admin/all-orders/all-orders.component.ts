import { Component, OnInit } from '@angular/core';
import { AdminOrdersService } from 'src/app/services/admin-orders.service';
import { Entity } from 'src/models/entities.models';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
    {
      name: 'order'
    }
  ];

  public entity: Entity = {
    entityInfo: 'pedido',
    entityText: 'el pedido'
  };

  constructor(public _adminOrdersService: AdminOrdersService) {}


  ngOnInit(): void {
  }

}
