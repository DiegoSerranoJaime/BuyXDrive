import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminBrandsService } from 'src/app/services/admin-brands.service';
import { BrandForm } from 'src/models/adminBrands.models';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.scss']
})
export class BrandsFormComponent implements OnInit {

  public data: any;
  public brand: BrandForm;

  public form: FormGroup
  public name: FormControl;
  public type: FormControl;

  public types = ['Vehiculo', 'Articulo'];

  constructor(private _adminBrandsService: AdminBrandsService) { }

  ngOnInit(): void {
    if (this.data && this.data.id >= 0) {
      this._adminBrandsService.getById(this.data.id).subscribe((brand) => {
        this.brand = brand;
        this.buildFormControls();
        this.buildFormGroup();
      });
    } else {
      this.buildFormControls();
      this.buildFormGroup();
    }

  
  }

  buildFormControls() {
    this.name = new FormControl(this.brand ? this.brand.name : '', [
      Validators.required
    ]);
    
    this.type = new FormControl(this.brand ? this.brand.type : '', [
      Validators.required
    ]);


  }

  buildFormGroup() {
    this.form = new FormGroup({
      name: this.name,
      type: this.type,
    });
  }
}
