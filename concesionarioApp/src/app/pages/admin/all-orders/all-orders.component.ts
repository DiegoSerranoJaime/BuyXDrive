import { Component, OnInit } from '@angular/core';
import { AdminOrdersService } from 'src/app/services/admin-orders.service';
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

  constructor(public _adminOrdersService: AdminOrdersService) {}


  ngOnInit(): void {
  }

}
