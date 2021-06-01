import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminModelsService } from 'src/app/services/admin-models.service';
import { modelForm } from 'src/models/adminModels.models';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss']
})
export class ModelFormComponent implements OnInit {

  public data: any;
  public model: modelForm;

  public genders: any[] = [];

  public form: FormGroup;
  public name: FormControl;


  constructor(private _adminModelsService: AdminModelsService) { }

  ngOnInit(): void {
    if (this.data && this.data.id >= 0) {
      this._adminModelsService.getById(this.data.fatherId, this.data.id).subscribe((model) => {
        this.model = model;
        this.buildFormControls();
        this.buildFormGroup();
      });
    } else {
      this.buildFormControls();
      this.buildFormGroup();
    }
  
  }

  buildFormControls() {
    this.name = new FormControl(this.model ? this.model.name : '', [
      Validators.required
    ]);
  }

  buildFormGroup() {
    this.form = new FormGroup({
      name: this.name,
    });
  }
}
