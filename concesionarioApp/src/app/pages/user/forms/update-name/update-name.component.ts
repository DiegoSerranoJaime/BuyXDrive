import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-name',
  templateUrl: './update-name.component.html',
  styleUrls: ['./update-name.component.scss']
})
export class UpdateNameComponent implements OnInit {

  public data: any;

  public form: FormGroup;
  public name: FormControl;
  public surname: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.buildFormControls();
    this.buildFormGroup();
  }

  buildFormControls() {
    this.name = new FormControl(this.data.name, [
      Validators.required
    ]);

    this.surname = new FormControl(this.data.surname, [
      Validators.required
    ]);
  }

  buildFormGroup() {
    this.form = new FormGroup({
      name: this.name,
      surname: this.surname,
    });
  }
}
