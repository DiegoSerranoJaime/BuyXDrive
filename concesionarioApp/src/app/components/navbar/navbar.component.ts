import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { LoginComponent } from '../modals/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _modal: ModalService) { }

  ngOnInit(): void {
  }

  public login() {
    this._modal.show(LoginComponent, {
      title: 'Inicio de <span class="text-danger">Sesión</span>',
      botonAceptar: 'Iniciar sesión',
      aceptar: (componente) => {
        console.log(componente.data)
        this._modal.hide();
      }
   });
  }

}
