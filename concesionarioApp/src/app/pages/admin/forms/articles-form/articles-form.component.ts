import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { AdminArticlesService } from 'src/app/services/admin-articles.service';
import { ArticleForm } from 'src/models/adminArticles.models';

@Component({
  selector: 'app-articles-form',
  templateUrl: './articles-form.component.html',
  styleUrls: ['./articles-form.component.scss']
})
export class ArticlesFormComponent implements OnInit {

  public data: any;
  public article: ArticleForm;

  public brands: any[] = [];
  public types: any[] = [];

  public form: FormGroup;
  public name: FormControl;
  public brand: FormControl;
  public type: FormControl;
  public images: FormControl;
  public price: FormControl;
  public amount: FormControl;
  public discount: FormControl;
  public description: FormControl;

  constructor(private _adminArticlesService: AdminArticlesService) { }

  ngOnInit(): void {
    combineLatest(this._adminArticlesService.getAllTypes(), this._adminArticlesService.getAllBrands()).subscribe(
      ([types, brands]) => {
        this.types = types;
        this.brands = brands;
      }
    );

    if (this.data && this.data.id >= 0) {
      this._adminArticlesService.getById(this.data.id).subscribe((article) => {
        this.article = article;
        this.buildFormControls();
        this.buildFormGroup();
      });
    } else {
      this.buildFormControls();
      this.buildFormGroup();
    }
  }

  buildFormControls() {
    this.name = new FormControl(this.article ? this.article.name : '', [
      Validators.required,
    ]);

    this.brand = new FormControl(this.article ? this.article.brand : '', [
      Validators.required,
    ]);

    this.type = new FormControl(this.article ? this.article.type : '', [
      Validators.required
    ]);

    this.images = new FormControl('', [
      Validators.required
    ]);

    this.price = new FormControl(this.article ? this.article.price : 0, [
      Validators.required,
      Validators.min(0),
      Validators.max(9999999999999.99)
    ]);

    this.amount = new FormControl(this.article ? this.article.amount : 0, [
      Validators.required,
      Validators.min(0)
    ]);

    this.discount = new FormControl(this.article ? this.article.discount : 0, [
      Validators.required,
      Validators.min(0)
    ]);

    this.description = new FormControl(this.article ? this.article.description : '', [
      Validators.required
    ]);
  }

  buildFormGroup() {
    if (this.data) {
      this.form = new FormGroup({
        brand: this.brand,
        type: this.type,
        price: this.price,
        amount: this.amount,
        discount: this.discount,
        description: this.description
      });
    } else {
      this.form = new FormGroup({
        name: this.name,
        brand: this.brand,
        type: this.type,
        images: this.images,
        price: this.price,
        amount: this.amount,
        discount: this.discount,
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
