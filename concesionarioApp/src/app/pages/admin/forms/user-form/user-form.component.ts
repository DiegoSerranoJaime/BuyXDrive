import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService } from 'src/app/services/admin-users.service';
import { GendersService } from 'src/app/services/genders.service';
import { ValidationsService } from 'src/app/services/validations.service';
import { UserForm } from 'src/models/adminUsers.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public data: any;
  public user: UserForm;

  public genders: any[] = [];

  public form: FormGroup;
  public name: FormControl;
  public surname: FormControl;
  public email: FormControl;
  public password: FormControl;
  public gender: FormControl;
  public address: FormControl;
  public phoneNumber: FormControl;

  constructor(private _adminUsersService: AdminUsersService,
    private _gendersService: GendersService,
    private _validationsService: ValidationsService) { }

  ngOnInit(): void {
    this._gendersService.getAll().subscribe((genders) => {
      this.genders = genders;
    });

    if (this.data && this.data.id >= 0) {
      this._adminUsersService.getById(this.data.id).subscribe((user) => {
        this.user = user;
        this.buildFormControls();
        this.buildFormGroup();
      });
    } else {
      this.buildFormControls();
      this.buildFormGroup();
    }
  
  }

  buildFormControls() {
    this.name = new FormControl(this.user ? this.user.name : '', [
      Validators.required
    ]);

    this.surname = new FormControl(this.user ? this.user.surname : '', [
      Validators.required
    ]);

    this.email = new FormControl(this.user ? this.user.email : '', [
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

    this.gender = new FormControl(this.user ? this.user.gender : '', [
      Validators.required
    ]);

    this.address = new FormControl(this.user ? this.user.address : '', [
      Validators.required
    ]);

    this.phoneNumber = new FormControl(this.user ? this.user.phone_number : '', [
      Validators.required
    ]);
  }

  buildFormGroup() {
    if (this.data) {
      this.form = new FormGroup({
        name: this.name,
        surname: this.surname,
        password: this.password,
        gender: this.gender,
        address: this.address,
        phoneNumber: this.phoneNumber
      });
    } else {
      this.form = new FormGroup({
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        gender: this.gender,
        address: this.address,
        phoneNumber: this.phoneNumber
      });
    }
  }
}
