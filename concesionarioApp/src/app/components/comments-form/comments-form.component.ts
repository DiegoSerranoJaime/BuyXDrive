import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss']
})
export class CommentsFormComponent implements OnInit {

  myForm: FormGroup;
  title: FormControl;
  body: FormControl;
  valoration: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.title = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]);
    this.body = new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]);
    this.valoration = new FormControl('', [Validators.required, Validators.max(5), Validators.min(0)]);
  }

  createForm() {
    this.myForm = new FormGroup({
      title: this.title,
      body: this.body,
      valoration: this.valoration
    });
  }

  submit() {

    if (this.myForm.valid) {

    }

    this.myForm.markAllAsTouched();
  }
}
