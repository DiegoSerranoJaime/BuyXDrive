import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-phone-number',
  templateUrl: './update-phone-number.component.html',
  styleUrls: ['./update-phone-number.component.scss']
})
export class UpdatePhoneNumberComponent implements OnInit {

  public data: any;

  public form: FormGroup;
  public phoneNumber: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.buildFormControls();
    this.buildFormGroup();
  }

  buildFormControls() {
    this.phoneNumber = new FormControl(this.data.phoneNumber, [
      Validators.required,
      Validators.pattern('[0-9]{9}')
    ]);
  }

  buildFormGroup() {
    this.form = new FormGroup({
      phoneNumber: this.phoneNumber,
    });
  }
}
