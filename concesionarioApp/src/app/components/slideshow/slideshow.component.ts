import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/core";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  @Input() images: any;

  constructor() { }

  ngOnInit(): void {
  }

}
