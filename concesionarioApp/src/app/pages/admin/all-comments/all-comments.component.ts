import { Component, OnInit } from '@angular/core';
import { AdminCommentsService } from 'src/app/services/admin-comments.service';
import { Entity } from 'src/models/entities.models';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss']
})
export class AllCommentsComponent implements OnInit {

  public permisos: Permissions[] = [
    {
      name: 'composeView',
      route: './'
    }, {
      name: 'composeDelete'
    }
  ];

  public keys = [
    'user_id',
    'product_id'
  ];

  public entity: Entity = {
    entityInfo: 'comentario del usuario',
    entityText: 'el comentario del usuario'
  };

  constructor(public _adminCommentsService: AdminCommentsService) {}

  ngOnInit(): void {}

}
