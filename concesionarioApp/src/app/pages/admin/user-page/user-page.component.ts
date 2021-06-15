import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminUserAppraisalService } from 'src/app/services/admin-user-appraisal.service';
import { AdminUserOrdersService } from 'src/app/services/admin-user-orders.service';
import { Permissions } from 'src/models/permissions.model';
import { Entity } from 'src/models/entities.models';
import { Location } from '@angular/common';
import { AdminUserCommentsService } from 'src/app/services/admin-user-comments.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public id: number;

  public permisosOrders: Permissions[] = [
    {
      name: 'view',
      route: './order'
    },
    {
      name: 'order'
    }
  ];
  
  public permisosComments: Permissions[] = [
    {
      name: 'view',
      route: './product'
    }, {
      name: 'delete'
    }
  ];

  public entityOrder: Entity = {
    entityName: 'Pedidos'
  }
  public entityComment: Entity = {
    entityName: 'Comentarios',
    entityInfo: 'Comentario',
    entityText: 'el comentario del producto'
  }

  constructor(public _adminUserOrdersService: AdminUserOrdersService,
    public _adminUserCommentsService: AdminUserCommentsService,
    public _activatedRoute: ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params.id;
  }

  back() {
    this._location.back();
  }
}
