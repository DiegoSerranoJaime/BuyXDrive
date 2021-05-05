import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  data: any = {}

  myForm: FormGroup;
  name: FormControl;
  surname: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;
  address: FormControl;
  phoneNumber: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.buildFormControls();
    this.buildFormGroup();
  }

  buildFormControls() {
    this.name = new FormControl('', [
      Validators.required
    ]);

    this.surname = new FormControl('', [
      Validators.required
    ]);

    this.email = new FormControl('', [
      Validators.required
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]);

    this.passwordConfirmation = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]);

    this.address = new FormControl('', [
      Validators.required
    ]);

    this.phoneNumber = new FormControl('', [
      Validators.required
    ]);
  }

  buildFormGroup() {
    this.myForm = new FormGroup({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
      address: this.address,
      phoneNumber: this.phoneNumber
    });
  }

}
