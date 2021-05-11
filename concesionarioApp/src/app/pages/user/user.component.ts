import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterContentChecked {

  links = [
    {route: 'profile', name: 'Perfil'},
    {route: 'history', name: 'Historial'},
    {route: 'orders', name: 'Pedidos'},
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
