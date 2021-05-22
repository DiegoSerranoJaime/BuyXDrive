import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminArticlesService } from 'src/app/services/products/admin-articles.service';
import { AdminArticle } from 'src/models/adminArticles.models';
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
