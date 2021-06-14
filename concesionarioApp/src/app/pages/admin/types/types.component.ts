import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  public links: any[] = [
    { name: 'Vehículos', route: './vehicles'},
    { name: 'Artículos', route: './articles'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
