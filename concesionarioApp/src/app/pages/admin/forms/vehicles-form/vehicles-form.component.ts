import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { AdminVehiclesService } from 'src/app/services/admin-vehicles.service';
import { VehicleForm } from 'src/models/adminVehicles.model';

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.scss']
})
export class VehiclesFormComponent implements OnInit {

  public data: any;
  public vehicle: VehicleForm;

  public models: any[] = [];
  public types: any[] = [];

  public selectTractions = ['Trasera', 'Delantera'];
  public selectTransmissions = ['Manual', 'Automática'];
  public selectFuel = ['Eléctrico', 'Diesel', 'Gasolina'];

  public form: FormGroup;
  public modelId: FormControl;
  public type: FormControl;
  public images: FormControl;
  public price: FormControl;
  public amount: FormControl;
  public discount: FormControl;
  public cv: FormControl;
  public traction: FormControl;
  public transmission: FormControl;
  public km: FormControl;
  public fuel: FormControl;
  public consumption: FormControl;
  public doors: FormControl;
  public weight: FormControl;
  public seating: FormControl;
  public innerMaterials: FormControl;
  public description: FormControl;

  constructor(private _adminVehiclesService: AdminVehiclesService) { }

  ngOnInit(): void {
    combineLatest(this._adminVehiclesService.getAllTypes(), this._adminVehiclesService.getAllModels()).subscribe(
      ([types, models]) => {
        this.types = types;
        this.models = models;
      }
    );

    if (this.data && this.data.id >= 0) {
      this._adminVehiclesService.getById(this.data.id).subscribe((vehicle) => {
        this.vehicle = vehicle;
        this.buildFormControls();
        this.buildFormGroup();
      });
    } else {
      this.buildFormControls();
      this.buildFormGroup();
    }
  }

  buildFormControls() {
    this.modelId = new FormControl(this.vehicle ? this.vehicle.model_id : '', [
      Validators.required,
    ]);

    this.type = new FormControl(this.vehicle ? this.vehicle.type : '', [
      Validators.required
    ]);

    this.images = new FormControl('', [
      Validators.required
    ]);

    this.price = new FormControl(this.vehicle ? this.vehicle.price : 0, [
      Validators.required,
      Validators.min(0)
    ]);

    this.amount = new FormControl(this.vehicle ? this.vehicle.amount : 0, [
      Validators.required,
      Validators.min(0)
    ]);

    this.discount = new FormControl(this.vehicle ? this.vehicle.discount : 0, [
      Validators.required,
      Validators.min(0)
    ]);

    this.cv = new FormControl(this.vehicle ? this.vehicle.cv : 0, [
      Validators.required,
      Validators.min(0)
    ]);

    this.traction = new FormControl(this.vehicle ? this.vehicle.traction : '', [
      Validators.required
    ]);

    this.transmission = new FormControl(this.vehicle ? this.vehicle.transmission : '', [
      Validators.required
    ]);

    this.km = new FormControl(this.vehicle ? this.vehicle.km : 0, [
      Validators.required
    ]);

    this.fuel = new FormControl(this.vehicle ? this.vehicle.fuel : '', [
      Validators.required
    ]);

    this.consumption = new FormControl(this.vehicle ? this.vehicle.consumption : '', [
      Validators.required
    ]);

    this.doors = new FormControl(this.vehicle ? this.vehicle.doors : 0, [
      Validators.required,
      Validators.min(0)
    ]);

    this.weight = new FormControl(this.vehicle ? this.vehicle.weight : 0, [
      Validators.required,
      Validators.min(0)
    ]);

    this.seating = new FormControl(this.vehicle ? this.vehicle.seating : 0, [
      Validators.required,
      Validators.min(2)
    ]);

    this.innerMaterials = new FormControl(this.vehicle ? this.vehicle.inner_materials : '', [
      Validators.required
    ]);

    this.description = new FormControl(this.vehicle ? this.vehicle.description : '', [
      Validators.required
    ]);
  }

  buildFormGroup() {
    if (this.data) {
      this.form = new FormGroup({
        modelId: this.modelId,
        type: this.type,
        price: this.price,
        amount: this.amount,
        discount: this.discount,
        cv: this.cv,
        traction: this.traction,
        transmission: this.transmission,
        km: this.km,
        fuel: this.fuel,
        consumption: this.consumption,
        doors: this.doors,
        weight: this.weight,
        seating: this.seating,
        innerMaterials: this.innerMaterials,
        description: this.description
      });
    } else {
      this.form = new FormGroup({
        modelId: this.modelId,
        type: this.type,
        images: this.images,
        price: this.price,
        amount: this.amount,
        discount: this.discount,
        cv: this.cv,
        traction: this.traction,
        transmission: this.transmission,
        km: this.km,
        fuel: this.fuel,
        consumption: this.consumption,
        doors: this.doors,
        weight: this.weight,
        seating: this.seating,
        innerMaterials: this.innerMaterials,
        description: this.description
      });
    }
  }

  uploadImages(event) {
    const images = (event.target as HTMLInputElement).files;

    if (images.length > 0) {
      this.form.patchValue({
        images: images
      });
    }
  }

}
