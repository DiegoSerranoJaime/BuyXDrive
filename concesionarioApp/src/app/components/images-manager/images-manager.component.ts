import { Component, Input, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';
import { SimpleBodyModalComponent } from '../modals/simple-body-modal/simple-body-modal.component';
import { ImagesFormComponent } from '../../pages/admin/forms/images-form/images-form.component';

@Component({
  selector: 'app-images-manager',
  templateUrl: './images-manager.component.html',
  styleUrls: ['./images-manager.component.scss']
})
export class ImagesManagerComponent implements OnInit {

  @Input() id: number;

  public images: any[];

  public selectedImages: string[] = [];

  constructor(
    private _imagesService: ImagesService,
    private _modalService: ModalService,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    this._imagesService.getImagesOfAProduct(this.id).subscribe((images) => {
      this.images = images;
    })
  }

  
  selectImage(image) {
    const index = this.selectedImages.findIndex((i) => i == image);
    
    if (index < 0) {
      this.selectedImages.push(image);
    } else {
      this.selectedImages.splice(index, 1);
    }
  }

  checkSelected(name: string) {
    return this.selectedImages.some((image) => image === name);
  }

  delete() {
    this._modalService.show(SimpleBodyModalComponent, {
      title: 'Eliminar <span class="text-danger">Imagenes</span>',
      aceptar: (component) => {
        this._imagesService.delete(this.id, this.selectedImages).subscribe((data) => {
          if (data.ok) {
            this.images = data.data;
            this.selectedImages = [];
            this._toastService.show('Se han eliminado las imagenes correctamente');
          } else {
            this._toastService.show('No se han podido eliminar las imagenes');
          }

          this._modalService.hide();
        }, (err) => {
          console.log(err);
        });
      }
    },
    {
      body: `¿Estás seguro de que deseas eliminar las imagenes seleccionadas?`
    });
  }

  add() {
    this._modalService.show(ImagesFormComponent, {
      title: 'Agregar <span class="text-danger">Imagenes</span>',
      botonAceptar: 'Agregar',
      aceptar: (component: any) => {
        if (component.form.valid) {
          const images = component.form.value.images;
          for(let i = 0; i < images.length; i++) {
            this._imagesService.uploadImage(this.id, images[i]).subscribe((data) => {
              if (data.ok && i == (images.length - 1)) {
                this.images = data.data;
                this._toastService.show('Se han agregado las imagenes correctamente');
              } else if(i == (images.length - 1)) {
                this._toastService.show('No se han podido agregar las imagenes');
              }
              
              this._modalService.hide();
            }, (err) => {
              console.log(err);
            });
          }
        }
        component.form.markAllAsTouched();
      }
    }); 
  }

}
