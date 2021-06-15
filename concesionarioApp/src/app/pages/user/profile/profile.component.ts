import { Component, OnInit } from '@angular/core';
import { SimpleBodyModalComponent } from 'src/app/components/modals/simple-body-modal/simple-body-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { GendersService } from 'src/app/services/genders.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/models/user.model';
import { UpdateAddressComponent } from '../forms/update-address/update-address.component';
import { UpdateEmailComponent } from '../forms/update-email/update-email.component';
import { UpdateGenderComponent } from '../forms/update-gender/update-gender.component';
import { UpdateNameComponent } from '../forms/update-name/update-name.component';
import { UpdatePasswordComponent } from '../forms/update-password/update-password.component';
import { UpdatePhoneNumberComponent } from '../forms/update-phone-number/update-phone-number.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userData: User;
  public gender: any;

  constructor(private _authService: AuthService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _gendersService: GendersService) { }

  ngOnInit(): void {
    this.getUserData();
  }
  
  getUserData() {
    this.userData = this._authService.getDecodedToken();
    this._gendersService.getById(this.userData.gender).subscribe((gender) => {
      this.gender = gender;
    });
  }

  updateName() {
    this._modalService.show(UpdateNameComponent, {
      title: `Actualizar <span class="text-danger">Nombre</span>`,
      botonAceptar: 'Actualizar',
      aceptar: (component: any) => {
        if (component.form.valid) {
          this._authService.updateName(component.form.value).subscribe((data) => {
            if (data.ok) {
              this.getUserData();
              this._toastService.show(`Se ha actualizado el nombre correctamente`);
            } else {
              this._toastService.show(`No se ha podido actualizar el nombre del usuario`);
            }
            
            this._modalService.hide();
          }, (err) => {
            console.log(err);
          });
        }
        component.form.markAllAsTouched()
      }
    },
    {
      name: this.userData.name,
      surname: this.userData.surname
    });
  }

  updateEmail() {
    this._modalService.show(UpdateEmailComponent, {
      title: `Actualizar <span class="text-danger">Email</span>`,
      botonAceptar: 'Actualizar',
      aceptar: (component: any) => {
        if (component.form.valid) {
          this._authService.updateEmail(component.form.value).subscribe((data) => {
            if (data.ok) {
              this.getUserData();
              this._toastService.show(`Se ha actualizado el email correctamente`);
            } else {
              this._toastService.show(`No se ha podido actualizar el email del usuario`);
            }
            
            this._modalService.hide();
          }, (err) => {
            console.log(err);
          });
        }
        component.form.markAllAsTouched()
      }
    },
    {
      email: this.userData.email,
    });
  }
  
  updatePassword() {
    this._modalService.show(UpdatePasswordComponent, {
      title: `Actualizar <span class="text-danger">Contraseña</span>`,
      botonAceptar: 'Actualizar',
      aceptar: (component: any) => {
        if (component.form.valid) {
          this._authService.updatePassword(component.form.value).subscribe((data) => {
            if (data.ok) {
              this.getUserData();
              this._toastService.show(`Se ha actualizado la contraseña correctamente`);
            } else {
              this._toastService.show(`No se ha podido actualizar la contraseña del usuario`);
            }
            
            this._modalService.hide();
          }, (err) => {
            console.log(err);
          });
        }
        component.form.markAllAsTouched()
      }
    });
  }

  updateAddress() {
    this._modalService.show(UpdateAddressComponent, {
      title: `Actualizar <span class="text-danger">Dirección</span>`,
      botonAceptar: 'Actualizar',
      aceptar: (component: any) => {
        if (component.form.valid) {
          this._authService.updateAddress(component.form.value).subscribe((data) => {
            if (data.ok) {
              this.getUserData();
              this._toastService.show(`Se ha actualizado la dirección correctamente`);
            } else {
              this._toastService.show(`No se ha podido actualizar la dirección del usuario`);
            }
            
            this._modalService.hide();
          }, (err) => {
            console.log(err);
          });
        }
        component.form.markAllAsTouched()
      }
    },
    {
      address: this.userData.address,
    });
  }

  updateGender() {
    this._modalService.show(UpdateGenderComponent, {
      title: `Actualizar <span class="text-danger">Género</span>`,
      botonAceptar: 'Actualizar',
      aceptar: (component: any) => {
        if (component.form.valid) {
          this._authService.updateGender(component.form.value).subscribe((data) => {
            if (data.ok) {
              this.getUserData();
              this._toastService.show(`Se ha actualizado el género correctamente`);
            } else {
              this._toastService.show(`No se ha podido actualizar el género del usuario`);
            }
            
            this._modalService.hide();
          }, (err) => {
            console.log(err);
          });
        }
        component.form.markAllAsTouched()
      }
    },
    {
      gender: this.userData.gender,
    });
  }

  updatePhoneNumber() {
    this._modalService.show(UpdatePhoneNumberComponent, {
      title: `Actualizar <span class="text-danger">No. de Teléfono</span>`,
      botonAceptar: 'Actualizar',
      aceptar: (component: any) => {
        if (component.form.valid) {
          this._authService.updatePhoneNumber(component.form.value).subscribe((data) => {
            if (data.ok) {
              this.getUserData();
              this._toastService.show(`Se ha actualizado el no. de teléfono correctamente`);
            } else {
              this._toastService.show(`No se ha podido actualizar el no. de teléfono del usuario`);
            }
            
            this._modalService.hide();
          }, (err) => {
            console.log(err);
          });
        }
        component.form.markAllAsTouched()
      }
    },
    {
      phoneNumber: this.userData.phoneNumber,
    });
  }

  deactivate() {
    this._modalService.show(SimpleBodyModalComponent, {
      title: `Desactivar <span class="text-danger">Cuenta</span>`,
      botonAceptar: 'Desactivar',
      aceptar: (component: any) => {
        this._authService.logicDelete().subscribe((data) => {
          if (data.ok) {
            this._authService.logout();
            this._toastService.show(`Se ha desactivado la cuenta correctamente`);
          } else {
            this._toastService.show(`No se ha podido desactivar la cuenta`);
          }
          
          this._modalService.hide();
        }, (err) => {
          console.log(err);
        });
      }
    },
    {
      body: '¿Estás seguro de que deseas desactivar la cuenta?',
    });
  }
}
