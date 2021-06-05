import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminVehicle, VehicleForm } from 'src/models/adminVehicles.model';
import { AuthService } from './auth.service';
import { ImagesService } from './images.service';

@Injectable({
  providedIn: 'root'
})
export class AdminVehiclesService {
  baseUrl: string = `${environment.urlApi}/admin/vehicles`;
  productUrl: string = `${environment.urlApi}/products`;

  public orderColumns: string[] = ['No.', 'Marca', 'Modelo', 'Tipo', 'Valoración', 'Precio', 'Cantidad', 'Descuento', 'Activo', 'Acciones'];
  public orderFields: any[] = [
    {
      field: 'id',
      type: 'number',
      noData: false
    },
    {
      field: 'bname',
      type: 'string',
      noData: true
    },
    {
      field: 'mname',
      type: 'string',
      noData: false
    },
    {
      field: 'type',
      type: 'string',
      noData: false
    },
    {
      field: 'val',
      type: 'number',
      noData: false
    },
    {
      field: 'price',
      type: 'price',
      noData: false
    },
    {
      field: 'amount',
      type: 'number',
      noData: false
    },
    {
      field: 'discount',
      type: 'percentage',
      noData: false
    },
    {
      field: 'active',
      type: 'boolean',
      noData: false
    }
  ];

  constructor(private _http: HttpClient,
    private _authService: AuthService,
    private _imagesService: ImagesService) { }

  getAll(): Observable<AdminVehicle[]> {
    return this._http.get<AdminVehicle[]>(`${this.baseUrl}`, {
      headers: this._authService.getToken()
    });
  }

  getById(id: number): Observable<VehicleForm> {
    return this._http.get<VehicleForm>(`${this.baseUrl}/${id}`, {
      headers: this._authService.getToken()
    }).pipe(map((v) => v[0]));
  }

  delete(id: number): Observable<AdminVehicle[]> {
    return this._http.get<AdminVehicle[]>(`${this.baseUrl}/delete/${id}`, {
      headers: this._authService.getToken()
    });
  }

  logicDelete(id: number): Observable<AdminVehicle[]> {
    return this._http.get<AdminVehicle[]>(`${this.baseUrl}/logicDelete/${id}`, {
      headers: this._authService.getToken()
    });
  }
  reactive(id: number): Observable<AdminVehicle[]> {
    return this._http.get<AdminVehicle[]>(`${this.baseUrl}/reactive/${id}`, {
      headers: this._authService.getToken()
    });
  }

  add(form: any): Observable<AdminVehicle[]> {
    const product = {
      price: form.price,
      amount: form.amount,
      discount: form.discount,
      description: form.description,
    };
    
    let subject = new Subject<any>();

    this._http.post<any>(`${this.productUrl}/add`, product, {
      headers: this._authService.getToken()
    }).subscribe((data) => {
      if (data.ok) {
        const vehicle = {
          id: data.data,
          modelId: form.modelId,
          type: form.type,
          cv: form.cv,
          traction: form.traction,
          transmission: form.transmission,
          km: form.km,
          fuel: form.fuel,
          consumption: form.consumption,
          doors: form.doors,
          weight: form.weight,
          seating: form.seating,
          innerMaterials: form.innerMaterials,
        };

        this._http.post<any>(`${this.baseUrl}/add`, vehicle, {
          headers: this._authService.getToken()
        }).subscribe(() => {
          this.getAll().subscribe((data) => {
            subject.next({
              ok: true,
              data: data
            });
          });
        });

        const imagesData = form.images as File[];
        
        for(let i = 0; i < imagesData.length; i++) {
          this._imagesService.uploadImage(vehicle.id, imagesData[i]).subscribe();
        }
      }
    }); 

    return subject;
  }

  update(id: number, form: any): Observable<AdminVehicle[]> {
    const product = {
      price: form.price,
      amount: form.amount,
      discount: form.discount,
      description: form.description,
    };
    
    let subject = new Subject<any>();

    this._http.put<any>(`${this.productUrl}/update/${id}`, product, {
      headers: this._authService.getToken()
    }).subscribe((data) => {
      if (data.ok) {
        const vehicle = {
          id: id,
          modelId: form.modelId,
          type: form.type,
          cv: form.cv,
          traction: form.traction,
          transmission: form.transmission,
          km: form.km,
          fuel: form.fuel,
          consumption: form.consumption,
          doors: form.doors,
          weight: form.weight,
          seating: form.seating,
          innerMaterials: form.innerMaterials,
        };

        this._http.put<any>(`${this.baseUrl}/update/:id`, vehicle, {
          headers: this._authService.getToken()
        }).subscribe(() => {
          this.getAll().subscribe((data) => {
            subject.next({
              ok: true,
              data: data
            });
          });
        });
      }
    }); 

    return subject;
  }

  getAllModels(): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/models`, {
      headers: this._authService.getToken()
    });
  }

  getAllTypes(): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/types`, {
      headers: this._authService.getToken()
    });
  }

}
