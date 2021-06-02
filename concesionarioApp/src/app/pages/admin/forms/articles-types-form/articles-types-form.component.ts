import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminArticlesTypesService } from 'src/app/services/admin-articles-types.service';
import { ArticleTypeForm } from 'src/models/adminArticlesTypes.models';

@Component({
  selector: 'app-articles-types-form',
  templateUrl: './articles-types-form.component.html',
  styleUrls: ['./articles-types-form.component.scss']
})
export class ArticlesTypesFormComponent implements OnInit {


  public data: any;
  public articleType: ArticleTypeForm;

  public genders: any[] = [];

  public form: FormGroup;
  public name: FormControl;


  constructor(private _adminArticlesTypesService: AdminArticlesTypesService) { }

  ngOnInit(): void {
    if (this.data && this.data.id >= 0) {
      this._adminArticlesTypesService.getById(this.data.id).subscribe((articleType) => {
        this.articleType = articleType;
        this.buildFormControls();
        this.buildFormGroup();
      });
    } else {
      this.buildFormControls();
      this.buildFormGroup();
    }
  
  }

  buildFormControls() {
    this.name = new FormControl(this.articleType ? this.articleType.name : '', [
      Validators.required
    ]);
  }

  buildFormGroup() {
    this.form = new FormGroup({
      name: this.name,
    });
  }

}
