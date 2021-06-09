import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Comment } from 'src/models/comments.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input() comments: Comment[];
  
  public loadComments: number;
  public page: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.page = 1;
    this.loadComments = 5;
  }

  incrementPage(): void {
    if (this.loadMore()) {
      this.page++;
    }
  }

  loadMore(): boolean {
    return !((this.comments.length - 1) < (this.page * this.loadComments));
  }
}
