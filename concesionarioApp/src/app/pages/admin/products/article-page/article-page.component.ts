import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article } from 'src/models/articles.model';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {

  public id: number;
  public article: Article;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _articlesService: ArticlesService,

  ) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params.id;

    this._articlesService.getArticle(this.id).subscribe((article) => {
      this.article = article;
    })
  }
}
