import { ComponentFactoryResolver } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalInterface } from 'src/app/interfaces/moda.interface';
import { ModalOptions, ModalService, ModalShow } from 'src/app/services/modal.service';
import { AdHostDirective } from './ad-host.directive';
declare const bootstrap: any;

type ModalMethods = {
  show(): void,
  hide(): void
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal?: ElementRef<HTMLDivElement>;
  @ViewChild(AdHostDirective, {static: true}) adHost?: AdHostDirective;
  private _myModal?: ModalMethods;
  public options: ModalOptions<any> = {
    title: 'Default',
    botonAceptar: 'Aceptar',
    botonCancelar: 'Cancelar',
    aceptar: () => {}
  };
  public componente?: ModalInterface;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private _modal: ModalService
  ) { }

  ngOnInit(): void {
    this._myModal = new bootstrap.Modal(this.modal!.nativeElement, {
      keyboard: false
    });

    this._modal.show$.subscribe(this.onModalShow.bind(this));
    this._modal.hide$.subscribe(this.onModalHide.bind(this));
  }

  onModalShow(modalShow: ModalShow<any>) {
    this.options = modalShow.options;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalShow.component);
    const viewContainerRef = this.adHost!.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ModalInterface>(componentFactory);
    componentRef.instance.data = modalShow.data;
    this.componente = componentRef.instance;
    this._myModal!.show();
  }

  onModalHide() {
    this._myModal!.hide();
  }

}
