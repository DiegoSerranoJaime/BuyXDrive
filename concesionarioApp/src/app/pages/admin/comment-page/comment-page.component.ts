import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminCommentsService } from 'src/app/services/admin-comments.service';
import { Comment } from 'src/models/comments.model';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.scss']
})
export class CommentPageComponent implements OnInit {

  private productId: number;
  private userId: number;
  public comment: Comment;

  constructor(private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _adminCommentsService: AdminCommentsService) { }

  ngOnInit(): void {
    this.productId = this._activatedRoute.snapshot.params.productId;
    this.userId = this._activatedRoute.snapshot.params.userId;

    this._adminCommentsService.getById(this.productId, this.userId).subscribe((data) => {
      this.comment = data
    });
  }

  back() {
    this._location.back();
  }
}
