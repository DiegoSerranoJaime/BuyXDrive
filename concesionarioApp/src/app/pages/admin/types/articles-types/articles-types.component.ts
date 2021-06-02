import { Component, OnInit } from '@angular/core';
import { AdminArticlesTypesService } from 'src/app/services/admin-articles-types.service';
import { Permissions } from 'src/models/permissions.model';
import { ArticlesTypesFormComponent } from '../../forms/articles-types-form/articles-types-form.component';

@Component({
  selector: 'app-articles-types',
  templateUrl: './articles-types.component.html',
  styleUrls: ['./articles-types.component.scss']
})
export class ArticlesTypesComponent implements OnInit {

  public articlesTypesFormComponent = ArticlesTypesFormComponent;
  public permisos: Permissions[] = [
    {
      name: 'delete'
    },
    {
      name: 'add'
    },
    {
      name: 'update'
    }
  ]

  constructor(public _adminArticlesTypesService: AdminArticlesTypesService) {}

  ngOnInit(): void {
  }
}
