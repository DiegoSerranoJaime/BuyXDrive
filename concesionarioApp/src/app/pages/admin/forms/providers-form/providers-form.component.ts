import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminProvidersService } from 'src/app/services/admin-providers.service';
import { ProviderForm } from '../../../../../models/adminProviders.models';

@Component({
  selector: 'app-providers-form',
  templateUrl: './providers-form.component.html',
  styleUrls: ['./providers-form.component.scss']
})
export class ProvidersFormComponent implements OnInit {

  public data: any;
  public provider: ProviderForm;

  public form: FormGroup;
  public name: FormControl;
  public email: FormControl;
  public phoneNumber: FormControl;
  public address: FormControl;

  constructor(private _adminProvidersService: AdminProvidersService) { }

  ngOnInit(): void {
    if (this.data && this.data.id >= 0) {
      this._adminProvidersService.getById(this.data.id).subscribe((provider) => {
        this.provider = provider;
        this.buildFormControls();
        this.buildFormGroup();
      });
    } else {
      this.buildFormControls();
      this.buildFormGroup();
    }
  
  }

  buildFormControls() {
    this.name = new FormControl(this.provider ? this.provider.name : '', [
      Validators.required
    ]);
    
    this.email = new FormControl(this.provider ? this.provider.email : '', [
      Validators.required,
      Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
    ]);

    this.phoneNumber = new FormControl(this.provider ? this.provider.phone_number : '', [
      Validators.required,
      Validators.pattern('[0-9]{9}')
    ]);

    this.address = new FormControl(this.provider ? this.provider.address : '', [
      Validators.required
    ]);
    
  }

  buildFormGroup() {
    this.form = new FormGroup({
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address
    });
  }
}
