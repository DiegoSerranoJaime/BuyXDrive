import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { vehicle, vehicle_card } from 'src/models/vehicles.model';
import { withLatestFrom } from 'rxjs/operators';
import { CommentsService } from 'src/app/services/comments.service';
import { comment } from 'src/models/comments.model';
import { CartService } from 'src/app/services/cart.service';
import { ImagesService } from 'src/app/services/images.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {

  public id: number;
  public vehicle: vehicle;
  public vehicle_rel: vehicle_card[] = [];
  public images: any[] = [];
  public comments: comment[] = [];

  constructor(private _activatedRoute: ActivatedRoute,
    private _vehiclesService: VehiclesService,
    private _imagesService: ImagesService,
    private _commentsService: CommentsService,
    private _cartService: CartService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.id = params.id;

      combineLatest(this._vehiclesService.getVehicle(this.id),  this._imagesService.getImagesOfAProduct(this.id))
      .subscribe(([vehicle, images]) => {
        this.vehicle = vehicle;

        this._vehiclesService.getInitVehiclesByType(vehicle.type, this.id).subscribe((data: vehicle_card[]) => {
          this.vehicle_rel = data;
        });

        this.images = images;

      });

      this._commentsService.getCommentsOfAProduct(this.id).subscribe((data: comment[]) => {
        this.comments = data;
      });
    });
  }

  addProduct(id: number) {
    this._cartService.addToCart(id);
  }

}
