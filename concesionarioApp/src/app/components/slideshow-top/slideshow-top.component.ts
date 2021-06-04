import { Component, Input, OnInit } from '@angular/core';
import { VehicleCard } from 'src/models/vehicles.model';
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade } from "swiper/core";

// install Swiper modules
SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-slideshow-top',
  templateUrl: './slideshow-top.component.html',
  styleUrls: ['./slideshow-top.component.scss']
})
export class SlideshowTopComponent implements OnInit {

  @Input() vehicles: VehicleCard[];

  constructor() { }

  ngOnInit(): void {
  }

}
