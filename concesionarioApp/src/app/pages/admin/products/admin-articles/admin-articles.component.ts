import { Component, OnInit } from '@angular/core';
import { AdminArticlesService } from 'src/app/services/admin-articles.service';
import { Entity } from 'src/models/entities.models';
import { Permissions } from 'src/models/permissions.model';
import { ArticlesFormComponent } from '../../forms/articles-form/articles-form.component';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss']
})
export class AdminArticlesComponent implements OnInit {

  public articlesFormComponent = ArticlesFormComponent;
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
    {
      name: 'add'
    },
    {
      name: 'update'
    }
  ];

  public entity: Entity = {
    entityInfo: 'artículo',
    entityText: 'el artículo'
  };

  constructor(public _adminArticlesService: AdminArticlesService) {}

  ngOnInit(): void {
  }

}
