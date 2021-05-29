import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminEmployersService } from 'src/app/services/admin-employers.service';
import { Permissions } from 'src/models/permissions.model';
import { EmployerFormComponent } from '../forms/employer-form/employer-form.component';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss']
})
export class EmployersComponent implements OnInit {

  public employersFormComponent = EmployerFormComponent;
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
    },
    {
      name: 'add'
    },
    {
      name: 'update'
    }
  ]


  constructor(public _adminEmployersService: AdminEmployersService) {}


  ngOnInit(): void {
  }
}
