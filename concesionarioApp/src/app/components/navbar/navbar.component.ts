import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { LoginComponent } from '../modals/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userData: any = {};

  constructor(private _modal: ModalService,
    private _authService: AuthService) { }

  ngOnInit(): void {
  }

  public login() {
    this._modal.show(LoginComponent, {
      title: 'Inicio de <span class="text-danger">Sesión</span>',
      botonAceptar: 'Iniciar sesión',
      aceptar: (componente) => {
        if (componente.myForm.valid) {
          this._authService.login(componente.myForm.value);
          this._authService.getDecodedToken().then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          });
          this._modal.hide();
        }
        componente.myForm.markAllAsTouched();
      }
   });
  }

  logout() {
    this._authService.logout();
  }

  isAuthenticated() {
    return this._authService.isAuthenticated();
  }

}
