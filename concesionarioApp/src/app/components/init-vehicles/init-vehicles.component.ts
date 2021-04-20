import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-init-vehicles',
  templateUrl: './init-vehicles.component.html',
  styleUrls: ['./init-vehicles.component.scss']
})
export class InitVehiclesComponent implements OnInit {

  @Input() categoryTitle;
  @Input() vehicles;

  constructor() { }

  ngOnInit(): void {
  }

}
