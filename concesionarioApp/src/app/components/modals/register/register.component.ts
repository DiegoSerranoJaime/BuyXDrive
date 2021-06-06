import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GendersService } from 'src/app/services/genders.service';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  data: any = {};

  genders: any[] = [];

  myForm: FormGroup;
  name: FormControl;
  surname: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;
  gender: FormControl;
  address: FormControl;
  phoneNumber: FormControl;

  constructor(private _validationsService: ValidationsService,
    private _gendersService: GendersService) { }

  ngOnInit(): void {
    this._gendersService.getAll().subscribe((genders) => {
      this.genders = genders;
    });

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
      Validators.required,
      Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
    ], [
      this._validationsService.emailValidation()
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]);

    this.passwordConfirmation = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ], [
      this._validationsService.passwordValidation(this.password)
    ]);

    this.gender = new FormControl('', [
      Validators.required
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
      gender: this.gender,
      address: this.address,
      phoneNumber: this.phoneNumber
    });
  }

}
