import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {

  public data: any;

  public form: FormGroup;
  public email: FormControl;

  constructor(private _validationsService: ValidationsService) { }

  ngOnInit(): void {
    this.buildFormControls();
    this.buildFormGroup();
  }

  buildFormControls() {
    this.email = new FormControl(this.data.email, [
      Validators.required,
      Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
    ], [
      this._validationsService.emailExceptionValidation(this.data.email)
    ]);


  }

  buildFormGroup() {

    this.form = new FormGroup({
      email: this.email,
    });
  }
}
