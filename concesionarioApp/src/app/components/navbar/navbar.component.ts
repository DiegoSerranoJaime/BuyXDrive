import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoginComponent } from '../modals/login/login.component';
import { RegisterComponent } from '../modals/register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userData: any = {};

  constructor(private _modal: ModalService,
    private _authService: AuthService,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    this.userData = this._authService.getDecodedToken();
  }

  public login() {
    this._modal.show(LoginComponent, {
      title: 'Inicio de <span class="text-danger">Sesión</span>',
      botonAceptar: 'Iniciar sesión',
      aceptar: (componente) => {
        if (componente.myForm.valid) {
          this._authService.dataToken.subscribe((token) => {
            this.userData = token.user;
          });
          this._authService.login(componente.myForm.value);
          this._modal.hide();
        }
        componente.myForm.markAllAsTouched();
      }
   });
  }

  public register() {
    this._modal.show(RegisterComponent, {
      title: 'Creación de <span class="text-danger">Cuenta</span>',
      botonAceptar: 'Crear cuenta',
      aceptar: (componente) => {
        console.log(componente.myForm);
        if (componente.myForm.valid) {
          this._authService.register(componente.myForm.value).subscribe((data: any) => {
            this._toastService.show(data.msg);
          }, (err) => {
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
