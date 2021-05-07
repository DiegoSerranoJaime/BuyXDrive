import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  links = [
    {route: 'profile', name: 'Perfil'},
    {route: 'history', name: 'Historial'},
    {route: 'orders', name: 'Pedidos'},
  ];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit(): void {
  }

}
