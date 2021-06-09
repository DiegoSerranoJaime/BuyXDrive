import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { CartService } from 'src/app/services/cart.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ImagesService } from 'src/app/services/images.service';
import { ToastService } from 'src/app/services/toast.service';
import { Article, ArticleCard } from 'src/models/articles.model';
import { Comment } from 'src/models/comments.model';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {

  public id: number;
  public article: Article;
  public articleRel: ArticleCard[] = [];
  public images: any[] = [];
  public comments: Comment[] = [];

  constructor(private _activatedRoute: ActivatedRoute,
    private _articlesService: ArticlesService,
    public _imagesService: ImagesService,
    private _commentsService: CommentsService,
    private _cartService: CartService,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.id = params.id;

      this.getData();
    });
  }

  addProduct() {
    let exist = this._cartService.addToCart(this.id);
    let message: string;

    if (exist) {
      message = `Se ha incrementado la cantidad en 1 del producto ${this.article.name}`;
    } else {
      message = `Se ha agregado el producto ${this.article.name}`;
    }

    this._toastService.show(message);
  }

  getData() {
    combineLatest(this._articlesService.getArticle(this.id),  this._imagesService.getImagesOfAProduct(this.id), this._commentsService.getCommentsOfAProduct(this.id))
    .subscribe(([article, images, comments]) => {
      this.article = article;

      this._articlesService.getInitArticlesByType(article.type, this.id).subscribe((data: ArticleCard[]) => {
        this.articleRel = data;
      });

      this.images = images;
      this.comments = comments;
    });
  }
}
