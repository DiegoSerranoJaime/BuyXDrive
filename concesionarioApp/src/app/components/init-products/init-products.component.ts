import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-init-products',
  templateUrl: './init-products.component.html',
  styleUrls: ['./init-products.component.scss']
})
export class InitProductsComponent implements OnInit {

  @Input() categoryTitle: string;
  @Input() products: any[];
  @Input() type: string;

  constructor() { }

  ngOnInit(): void {
  }

}
