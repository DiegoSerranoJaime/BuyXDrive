import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public links: any[] = [
    { name: 'Vehiculos', route: './vehicles'},
    { name: 'Artículos', route: './articles'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
