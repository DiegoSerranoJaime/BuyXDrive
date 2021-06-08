import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminEmployersService } from 'src/app/services/admin-employers.service';
import { GendersService } from 'src/app/services/genders.service';
import { UserTypesService } from 'src/app/services/user-types.service';
import { ValidationsService } from 'src/app/services/validations.service';
import { EmployerForm } from 'src/models/adminEmployers.models';

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html',
  styleUrls: ['./employer-form.component.scss']
})
export class EmployerFormComponent implements OnInit {
  public data: any;
  public user: EmployerForm;

  public genders: any[] = [];
  public userTypes: any[] = [];

  public form: FormGroup;
  public name: FormControl;
  public surname: FormControl;
  public email: FormControl;
  public password: FormControl;
  public gender: FormControl;
  public address: FormControl;
  public phoneNumber: FormControl;
  public userType: FormControl;

  constructor(private _adminEmployersService: AdminEmployersService,
    private _gendersService: GendersService,
    private _userTypesService: UserTypesService,
    private _validationsService: ValidationsService) { }

  ngOnInit(): void {
    this._gendersService.getAll().subscribe((genders) => {
      this.genders = genders;
    });

    this._userTypesService.getAllEmployerTypes().subscribe((userTypes) => {
      this.userTypes = userTypes;
    })

    if (this.data && this.data.id >= 0) {
      this._adminEmployersService.getById(this.data.id).subscribe((user) => {
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
      this.user ? this._validationsService.emailExceptionValidation(this.user.email) : this._validationsService.emailValidation()
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
    
    this.userType = new FormControl(this.user ? this.user.user_type : '', [
      Validators.required
    ]);
  }

  buildFormGroup() {
    this.form = new FormGroup({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      gender: this.gender,
      address: this.address,
      phoneNumber: this.phoneNumber,
      userType: this.userType
    });
  }
}
