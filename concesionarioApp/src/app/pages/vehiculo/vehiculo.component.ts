import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { Vehicle, VehicleCard } from 'src/models/vehicles.model';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/models/comments.model';
import { CartService } from 'src/app/services/cart.service';
import { ImagesService } from 'src/app/services/images.service';
import { combineLatest } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {

  public id: number;
  public vehicle: Vehicle;
  public vehicleRel: VehicleCard[] = [];
  public images: any[] = [];
  public comments: Comment[] = [];

  constructor(private _activatedRoute: ActivatedRoute,
    private _vehiclesService: VehiclesService,
    public _imagesService: ImagesService,
    private _commentsService: CommentsService,
    private _cartService: CartService,
    private _toastService: ToastService,
    private _location: Location) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.id = params.id;

      combineLatest(this._vehiclesService.getVehicle(this.id),  this._imagesService.getImagesOfAProduct(this.id))
      .subscribe(([vehicle, images]) => {
        this.vehicle = vehicle;

        this._vehiclesService.getInitVehiclesByType(vehicle.type, this.id).subscribe((data: VehicleCard[]) => {
          this.vehicleRel = data;
        });

        this.images = images;
      });

      this._commentsService.getCommentsOfAProduct(this.id).subscribe((data: Comment[]) => {
        this.comments = data;
      });
    });
  }

  addProduct() {
    let exist = this._cartService.addToCart(this.id);
    let message: string;

    if (exist) {
      message = `Se ha incrementado la cantidad en 1 del producto ${this.vehicle.name}`;
    } else {
      message = `Se ha agregado el producto ${this.vehicle.name}`;
    }

    this._toastService.show(message);
  }
}
