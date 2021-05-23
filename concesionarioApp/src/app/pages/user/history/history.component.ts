import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public permisos: Permissions[] = [
    {
      name: 'view',
      route: './'
    }
  ];

  constructor(public _historyService: HistoryService) {}

  ngOnInit(): void {
  }
}
