import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalInterface } from 'src/app/interfaces/modal.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, ModalInterface {

  data: any = {};

  myForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.buildFormControls();
    this.buildFormGroup();
  }

  buildFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]);
  }

  buildFormGroup() {
    this.myForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

}
