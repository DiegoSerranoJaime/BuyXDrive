import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})
export class UpdateAddressComponent implements OnInit {

  public data: any;

  public form: FormGroup;
  public address: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.buildFormControls();
    this.buildFormGroup();
  }

  buildFormControls() {
    this.address = new FormControl(this.data.address, [
      Validators.required
    ]);
  }

  buildFormGroup() {
    this.form = new FormGroup({
      address: this.address,
    });
  }

}
