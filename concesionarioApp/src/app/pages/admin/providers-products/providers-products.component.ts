import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminProvidersProductsService } from 'src/app/services/admin-providers-products.service';
import { Permissions } from 'src/models/permissions.model';
import { ProvidersProductsFormComponent } from '../forms/providers-products-form/providers-products-form.component';

@Component({
  selector: 'app-providers-products',
  templateUrl: './providers-products.component.html',
  styleUrls: ['./providers-products.component.scss']
})
export class ProvidersProductsComponent implements OnInit {

  public id: number;

  public providersProductsFormComponent = ProvidersProductsFormComponent;
  public permisos: Permissions[] = [
    {
      name: 'delete'
    },
    {
      name: 'add'
    },
    {
      name: 'externalOrder'
    }
  ]


  constructor(public _adminProvidersProductsService: AdminProvidersProductsService,
    private _activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params.id;
  }
}
