import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { ArticleCard } from 'src/models/articles.model';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit {

  name: string;
  prices: number[] = [];
  valoration: number[] = [];
  selectedBrands: any[] = [];
  selectedTypes: any[] = [];

  allFilterData = false;
  brands: any[] = [];
  types: any[] = [];
  maxPrice: number = 0;

  articulos: ArticleCard[] = [];

  page: number = 1;
  pageSize: number = 16;

  constructor(private _articlesService: ArticlesService) { }

  ngOnInit(): void {
    this._articlesService.getAllArticles().subscribe((res) => {
      this.articulos = res;
    });

    combineLatest(this._articlesService.getArticlesBrands(), this._articlesService.getArticlesTypes(), this._articlesService.getArticlesMaxPrice())
    .subscribe(([brands, types, price]) => {
      this.brands = brands;
      this.types = types;
      this.maxPrice = Math.ceil(price['maxPrice']);
      this.allFilterData = true;
    });
  }

  filterName(event: any) {
    this.name = event;
  }

  filterPrice(event: any) {
    this.prices = event;
  }

  filterBrands(event: any[]) {
    if (event.length > 0) {
      this.selectedBrands = event;
    } else {
      this.selectedBrands = [];
    }
  }

  filterTypes(event: any[]) {
    if (event.length > 0) {
      this.selectedTypes = event;
    } else {
      this.selectedTypes = [];
    }
  }

  filterValoration(event: any) {
    this.valoration = event;
  }

  productsPerPage(event: any) {
    this.pageSize = event;
  }

}
