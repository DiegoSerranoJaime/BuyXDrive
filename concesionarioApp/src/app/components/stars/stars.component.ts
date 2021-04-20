import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit, OnChanges {

  @Input() valoration: number;

  private base: number = 5;
  public stars;
  public void_stars;
  public semi_stars: boolean;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.stars = [];
    this.semi_stars = false;
    this.void_stars = [];

    this.stars = new Array(Math.floor(this.valoration));

    let v_stars = Math.floor(this.base - this.valoration);

    this.void_stars = new Array(v_stars);

    if (v_stars < (this.base - this.valoration)) {
      this.semi_stars = true;
    }
  }

}
