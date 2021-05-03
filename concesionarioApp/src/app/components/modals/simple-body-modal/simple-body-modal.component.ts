import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-body-modal',
  templateUrl: './simple-body-modal.component.html',
  styleUrls: ['./simple-body-modal.component.scss']
})
export class SimpleBodyModalComponent implements OnInit {

  data: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
