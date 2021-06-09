import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  public data: any;

  public form: FormGroup;
  public password: FormControl;
  public passwordConfirmation: FormControl;

  constructor(private _validationsService: ValidationsService) { }

  ngOnInit(): void {
    this.buildFormControls();
    this.buildFormGroup();
  }

  buildFormControls() {
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.passwordConfirmation = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);
  }

  buildFormGroup() {

    this.form = new FormGroup({
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
    }, [
    ], [
      this._validationsService.passwordValidation()
    ]);
  }
}
