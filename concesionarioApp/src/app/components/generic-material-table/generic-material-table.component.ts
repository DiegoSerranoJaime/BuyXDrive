import { Location } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SimpleBodyModalComponent } from 'src/app/components/modals/simple-body-modal/simple-body-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ToastService } from 'src/app/services/toast.service';
import { Permissions } from 'src/models/permissions.model';

@Component({
  selector: 'app-generic-material-table',
  templateUrl: './generic-material-table.component.html',
  styleUrls: ['./generic-material-table.component.scss']
})
export class GenericMaterialTableComponent implements OnInit, AfterViewInit {

  @Input() volver: boolean;
  @Input() permisos: Permissions[];
  @Input() service: any;
  @Input() fatherId: number | string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true }) sort: MatSort;

  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[];
  public displayedData: any[];

  constructor(private _modalService: ModalService,
    private _toastService: ToastService,
    private _location: Location) { }

  ngOnInit(): void {
    this.displayedColumns = this.service.orderColumns;
    this.displayedData = this.service.orderFields;

    let getData = this.fatherId ? this.service.getAll(this.fatherId) : this.service.getAll();

    getData.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.initTableAdds();
  }


  initTableAdds(): void {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  checkPermission(name: string) {
    let permiso = false;

    if (this.permisos) {
      permiso = this.permisos.some((p) => p.name == name);
    }

    return permiso;
  }

  getRouteFromPermission(name: string) {
    let res: any = null;

    res = this.permisos.find((p) => p.name == name);

    return res.route;
  }

  cancelOrder(id: string) {
    this._modalService.show(SimpleBodyModalComponent, {
      title: 'Cancelar el <span class="text-danger">pedido</span>',
      aceptar: (component) => {
        this.service.cancel(id).subscribe((data) => {
          if (data.length > 0) {
            this._toastService.show(`Se ha cancelado el pedido ${ id }`);
          } else {
            this._toastService.show(`No se ha podido cancelar el pedido`);
          }

          this.dataSource.data = data;

          this._modalService.hide();
        }, (err) => {
          console.log(err);
        })
      }
    },
    {
      body: `¿Estás seguro de que deseas cancelar el pedido <span class="text-danger">${ id }</span>?`
    });
  }

  accept(id: string) {
    this._modalService.show(SimpleBodyModalComponent, {
      title: 'Aceptar el <span class="text-danger">pedido</span>',
      aceptar: (component) => {
        this.service.accept(id).subscribe((data) => {
          if (data.length > 0) {
            this._toastService.show(`Se ha aceptado el pedido ${ id }`);
          } else {
            this._toastService.show(`No se ha podido aceptar el pedido`);
          }

          console.log(data);
          this.dataSource.data = data;

          this._modalService.hide();
        }, (err) => {
          console.log(err);
        })
      }
    },
    {
      body: `¿Estás seguro de que deseas aceptar el pedido <span class="text-danger">${ id }</span>?`
    });
  }

  denegate(id: string) {
    this._modalService.show(SimpleBodyModalComponent, {
      title: 'Denegar el <span class="text-danger">pedido</span>',
      aceptar: (component) => {
        this.service.denegate(id).subscribe((data) => {
          if (data.length > 0) {
            this._toastService.show(`Se ha denegado el pedido ${ id }`);
          } else {
            this._toastService.show(`No se ha podido denegar el pedido`);
          }

          this.dataSource.data = data;

          this._modalService.hide();
        }, (err) => {
          console.log(err);
        })
      }
    },
    {
      body: `¿Estás seguro de que deseas denegar el pedido <span class="text-danger">${ id }</span>?`
    });
  }

  onWay(id: string) {
    this._modalService.show(SimpleBodyModalComponent, {
      title: 'Poner en camino el <span class="text-danger">pedido</span>',
      aceptar: (component) => {
        this.service.onWay(id).subscribe((data) => {
          if (data.length > 0) {
            this._toastService.show(`Se ha puesto en camino el pedido ${ id }`);
          } else {
            this._toastService.show(`No se ha podido poner en camino el pedido`);
          }

          this.dataSource.data = data;

          this._modalService.hide();
        }, (err) => {
          console.log(err);
        })
      }
    },
    {
      body: `¿Estás seguro de que deseas poner en camino el pedido <span class="text-danger">${ id }</span>?`
    });
  }

  deliver(id: string) {
    this._modalService.show(SimpleBodyModalComponent, {
      title: 'Entregar el <span class="text-danger">pedido</span>',
      aceptar: (component) => {
        this.service.deliver(id).subscribe((data) => {
          if (data.length > 0) {
            this._toastService.show(`Se ha entregado el pedido ${ id }`);
          } else {
            this._toastService.show(`No se ha podido entregar el pedido`);
          }

          this.dataSource.data = data;

          this._modalService.hide();
        }, (err) => {
          console.log(err);
        })
      }
    },
    {
      body: `¿Estás seguro de que deseas entregar el pedido <span class="text-danger">${ id }</span>?`
    });
  }

  deleteElement(id: any) {

    this._modalService.show(SimpleBodyModalComponent, {
      title: 'Eliminar el <span class="text-danger">registro</span>',
      aceptar: (component) => {
        this.service.delete(id).subscribe((data) => {
          if (data.length > 0) {
            this._toastService.show(`Se ha eliminado el registro ${ id }`);
          } else {
            this._toastService.show(`No se ha podido eliminar el registro`);
          }

          this.dataSource.data = data;

          this._modalService.hide();
        }, (err) => {
          console.log(err);
        })
      }
    },
    {
      body: `¿Estás seguro de que deseas eliminar el registro <span class="text-danger">${ id }</span>?`
    });
  }

  logicDelete(id: any) {

    this._modalService.show(SimpleBodyModalComponent, {
      title: 'Desactivar el <span class="text-danger">registro</span>',
      aceptar: (component) => {
        this.service.logicDelete(id).subscribe((data) => {
          if (data.length > 0) {
            this._toastService.show(`Se ha desactivado el registro ${ id }`);
          } else {
            this._toastService.show(`No se ha podido desactivar el registro`);
          }

          this.dataSource.data = data;

          this._modalService.hide();
        }, (err) => {
          console.log(err);
        })
      }
    },
    {
      body: `¿Estás seguro de que deseas descativar el registro <span class="text-danger">${ id }</span>?`
    });
  }

  reactive(id: any) {

    this._modalService.show(SimpleBodyModalComponent, {
      title: 'Activar el <span class="text-danger">registro</span>',
      aceptar: (component) => {
        this.service.reactive(id).subscribe((data) => {
          if (data.length > 0) {
            this._toastService.show(`Se ha activado el registro ${ id }`);
          } else {
            this._toastService.show(`No se ha podido activar el registro`);
          }

          this.dataSource.data = data;

          this._modalService.hide();
        }, (err) => {
          console.log(err);
        })
      }
    },
    {
      body: `¿Estás seguro de que deseas activar el registro <span class="text-danger">${ id }</span>?`
    });

  }



  goBack() {
    this._location.back();
  }
}
