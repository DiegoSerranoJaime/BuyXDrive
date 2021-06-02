import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminVehiclesTypesService } from 'src/app/services/admin-vehicles-types.service';
import { VehicleTypeForm } from 'src/models/adminVehiclesTypes.models';

@Component({
  selector: 'app-vehicles-types-form',
  templateUrl: './vehicles-types-form.component.html',
  styleUrls: ['./vehicles-types-form.component.scss']
})
export class VehiclesTypesFormComponent implements OnInit {

  public data: any;
  public vehicleType: VehicleTypeForm;

  public genders: any[] = [];

  public form: FormGroup;
  public name: FormControl;


  constructor(private _adminVehiclesTypesService: AdminVehiclesTypesService) { }

  ngOnInit(): void {
    if (this.data && this.data.id >= 0) {
      this._adminVehiclesTypesService.getById(this.data.id).subscribe((vehicleType) => {
        this.vehicleType = vehicleType;
        this.buildFormControls();
        this.buildFormGroup();
      });
    } else {
      this.buildFormControls();
      this.buildFormGroup();
    }
  
  }

  buildFormControls() {
    this.name = new FormControl(this.vehicleType ? this.vehicleType.name : '', [
      Validators.required
    ]);
  }

  buildFormGroup() {
    this.form = new FormGroup({
      name: this.name,
    });
  }

}
