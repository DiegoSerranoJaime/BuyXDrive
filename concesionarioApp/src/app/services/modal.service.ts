import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalInterface } from '../interfaces/modal.interface';

export type ModalShow<T> = {
  component: Type<ModalInterface>;
  options: ModalOptions<T>;
  data: any;
}

export type ModalOptions<T> = {
  title: string;
  botonCancelar: string;
  botonAceptar: string;
  aceptar: (componente: T) => void
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  public show$ = new Subject<ModalShow<any>>();
  public hide$ = new Subject<void>();

  public show<T extends ModalInterface>(component: Type<T>, options: Partial<ModalOptions<T>>, data?: any) {
    const _options: ModalOptions<T> = {
      title: 'Modal',
      botonAceptar: 'Aceptar',
      botonCancelar: 'Cancelar',
      aceptar: () => this.hide()
    };

    this.show$.next({
      component,
      options: { ..._options, ...options },
      data
    });
  }

  public hide() {
    this.hide$.next();
  }
}
