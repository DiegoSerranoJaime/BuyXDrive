import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _toast: MatSnackBar) { }

  public show(message: string): void {
    this._toast.openFromComponent(ToastComponent, {
      data: {
        message: message,
        icon: 'close'
      },
    });
  }
}
