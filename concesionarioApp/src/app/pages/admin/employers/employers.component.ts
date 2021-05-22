import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminEmployersService } from 'src/app/services/admin-employers.service';
import { AdminEmployer } from 'src/models/adminEmployers.models';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss']
})
export class EmployersComponent implements OnInit {

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


  constructor(public _adminEmployersService: AdminEmployersService) {}


  ngOnInit(): void {
  }
}
