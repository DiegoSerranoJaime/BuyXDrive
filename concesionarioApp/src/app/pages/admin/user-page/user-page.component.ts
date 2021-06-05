import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminUserAppraisalService } from 'src/app/services/admin-user-appraisal.service';
import { AdminUserOrdersService } from 'src/app/services/admin-user-orders.service';
import { Permissions } from 'src/models/permissions.model';

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

  constructor(public _adminUserOrdersService: AdminUserOrdersService,
    public _adminUserAppraisalService: AdminUserAppraisalService,
    public _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params.id;
  }

}
