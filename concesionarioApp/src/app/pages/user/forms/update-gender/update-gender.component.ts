import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GendersService } from 'src/app/services/genders.service';

@Component({
  selector: 'app-update-gender',
  templateUrl: './update-gender.component.html',
  styleUrls: ['./update-gender.component.scss']
})
export class UpdateGenderComponent implements OnInit {
  public data: any;

  public genders: any[] = [];
  public form: FormGroup;
  public gender: FormControl;

  constructor(private _gendersService: GendersService) { }

  ngOnInit(): void {
    this._gendersService.getAll().subscribe((genders) => {
      this.genders = genders;
    });

    this.buildFormControls();
    this.buildFormGroup();
  }

  buildFormControls() {
    this.gender = new FormControl(this.data.gender, [
      Validators.required
    ]);
  }

  buildFormGroup() {

    this.form = new FormGroup({
      gender: this.gender,
    });
  }

}
