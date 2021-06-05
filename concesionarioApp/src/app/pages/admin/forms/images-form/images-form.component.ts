import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-images-form',
  templateUrl: './images-form.component.html',
  styleUrls: ['./images-form.component.scss']
})
export class ImagesFormComponent implements OnInit {

  public data: any;

  public form: FormGroup;
  public images: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.buildFormControls();
    this.buildFormGroup();
  }

  buildFormControls() {
    this.images = new FormControl('', [
      Validators.required
    ]);
  }

  buildFormGroup() {
    this.form = new FormGroup({
      images: this.images,
    });
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
