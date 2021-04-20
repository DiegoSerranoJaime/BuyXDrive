import { Component, Input, OnInit } from '@angular/core';
import { comment } from 'src/models/comments.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: comment[];
  loadComments: number;

  constructor() { }

  ngOnInit(): void {
    this.loadComments = 5;
  }

}
