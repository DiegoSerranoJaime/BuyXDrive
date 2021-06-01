import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminModelsService } from 'src/app/services/admin-models.service';
import { Permissions } from 'src/models/permissions.model';
import { ModelFormComponent } from '../forms/model-form/model-form.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {

  public id: number;

  public modelFormComponent = ModelFormComponent;
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
  ];

  constructor(public _adminModelsService: AdminModelsService,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params.id;
  }
}
