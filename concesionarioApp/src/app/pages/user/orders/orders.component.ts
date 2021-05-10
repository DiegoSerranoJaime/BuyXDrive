import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SimpleBodyModalComponent } from 'src/app/components/modals/simple-body-modal/simple-body-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ToastService } from 'src/app/services/toast.service';
import { order } from 'src/models/orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public displayedColumns: string[] = [];
  public displayedData: any[] = [];
  public dataSource = new MatTableDataSource<order>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _ordersService: OrdersService,
    private _modalService: ModalService,
    private _toastService: ToastService) {}


  ngOnInit(): void {
    this.displayedColumns = this._ordersService.orderColumns;
    this.displayedData = this._ordersService.orderFields;

    this._ordersService.getOrdersNotDelivered().subscribe((orders) => {
      this.dataSource.data = orders;
      this.initPaginator();
    });
  }

  initPaginator() {
    this.dataSource.paginator = this.paginator;
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

}
