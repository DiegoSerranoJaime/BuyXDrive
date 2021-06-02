import { Component, OnInit } from '@angular/core';
import { AdminArticlesService } from 'src/app/services/admin-articles.service';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss']
})
export class AdminArticlesComponent implements OnInit {

  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    },
    {
      name: 'delete',
      route: './'
    },
    {
      name: 'logicDelete',
    },
  ]

  constructor(public _adminArticlesService: AdminArticlesService) {}


  ngOnInit(): void {
  }

}
