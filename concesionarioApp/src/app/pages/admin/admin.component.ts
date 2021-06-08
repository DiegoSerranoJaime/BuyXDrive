import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  links = [
    {route: 'users', name: 'Usuarios'},
    {route: 'employers', name: 'Empleados'},
    {route: 'providers', name: 'Proveedores'},
    {route: 'orders', name: 'Pedidos'},
    {route: 'brands', name: 'Marcas'},
    {route: 'types', name: 'Tipos'},
    {route: 'products', name: 'Productos'},
    {route: 'comments', name: 'Comentarios'},
  ];
  activeLink = this.links[0];

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    let initialPath = this._activatedRoute.children[0].snapshot.url[0].path;
    this.activeLink = this.links.find((l) => l.route == initialPath);
  }
}
