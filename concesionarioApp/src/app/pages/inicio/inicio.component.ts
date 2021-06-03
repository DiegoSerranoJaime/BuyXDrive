import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ArticleCard } from 'src/models/articles.model';
import { VehicleCard } from 'src/models/vehicles.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public vehicles: VehicleCard[] = [];
  public topVehicles: VehicleCard[] = [];
  public articles: ArticleCard[] = [];

  constructor(private _vehiclesService: VehiclesService,
    private _articlesService: ArticlesService) { }

  ngOnInit(): void {
    combineLatest(this._vehiclesService.getInitVehicles(), this._articlesService.getInitArticles(), this._vehiclesService.getTopVehicles()).subscribe(
      ([vehicles, articles, topVehicles]) => {
        this.vehicles = vehicles;
        this.articles = articles;
        this.topVehicles = topVehicles;
      }
    );
  }

}
