import { Location } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SimpleBodyModalComponent } from 'src/app/components/modals/simple-body-modal/simple-body-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-generic-material-table',
  templateUrl: './generic-material-table.component.html',
  styleUrls: ['./generic-material-table.component.scss']
})
export class GenericMaterialTableComponent implements OnInit, AfterViewInit {

  @Input() displayedColumns: string[];
  @Input() displayedData: any[];
  @Input() dataSource: MatTableDataSource<any>;
  @Input() volver: boolean;
  @Input() permisos: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true }) sort: MatSort;

  constructor(private _ordersService: OrdersService,
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _location: Location) { }

  ngOnInit(): void {
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

  cancelOrder(id: string) {
    this._modalService.show(SimpleBodyModalComponent, {
      title: 'Cancelar el <span class="text-danger">pedido</span>',
      aceptar: (component) => {
        this._ordersService.cancelOrder(id).subscribe((data) => {
          if (data.ok) {
            this._toastService.show(`Se ha cancelado el pedido ${ id }`);
          } else {
            this._toastService.show(`No se ha podido cancelar el pedido`);
          }

          console.log(data);

          this._modalService.hide();
        }, (err) => {
          console.log(err);
        })
      }
    },
    {
      body: `¿Estás seguro de que deseas cancelar el pedido <span class="text-danger">${ id }</span>?`
    })
  }

  checkPermission(name: string) {
    return this.permisos.some((p) => p.name == name);
  }

  getRouteFromPermission(name: string) {
    let res: any = null;

    res = this.permisos.find((p) => p.name == name);

    return res.route;
  }

  goBack() {
    this._location.back();
  }
}
