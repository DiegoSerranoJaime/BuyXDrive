import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { EmployersComponent } from './employers/employers.component';
import { ProvidersComponent } from './providers/providers.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserModule } from '../user/user.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminVehiclesComponent } from './products/admin-vehicles/admin-vehicles.component';
import { ProductsComponent } from './products/products.component';
import { AdminArticlesComponent } from './products/admin-articles/admin-articles.component';
import { BrandsComponent } from './brands/brands.component';
import { ProvidersFormComponent } from './forms/providers-form/providers-form.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrandsFormComponent } from './forms/brands-form/brands-form.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { EmployerFormComponent } from './forms/employer-form/employer-form.component';
import { ProvidersProductsComponent } from './providers-products/providers-products.component';
import { ProvidersProductsFormComponent } from './forms/providers-products-form/providers-products-form.component';
import { ModelsComponent } from './models/models.component';
import { ModelFormComponent } from './forms/model-form/model-form.component';
import { VehiclesFormComponent } from './forms/vehicles-form/vehicles-form.component';
import { TypesComponent } from './types/types.component';
import { ArticlesTypesComponent } from './types/articles-types/articles-types.component';
import { VehiclesTypesComponent } from './types/vehicles-types/vehicles-types.component';
import { VehiclesTypesFormComponent } from './forms/vehicles-types-form/vehicles-types-form.component';
import { ArticlesTypesFormComponent } from './forms/articles-types-form/articles-types-form.component';
import { ArticlesFormComponent } from './forms/articles-form/articles-form.component';
import { VehiclePageComponent } from './products/vehicle-page/vehicle-page.component';
import { ArticlePageComponent } from './products/article-page/article-page.component';
import { ImagesFormComponent } from './forms/images-form/images-form.component';
import { ImagesManagerComponent } from 'src/app/components/images-manager/images-manager.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UserPageComponent,
    AllOrdersComponent,
    EmployersComponent,
    ProvidersComponent,
    AdminVehiclesComponent,
    ProductsComponent,
    AdminArticlesComponent,
    BrandsComponent,
    ProvidersFormComponent,
    BrandsFormComponent,
    UserFormComponent,
    EmployerFormComponent,
    ProvidersProductsComponent,
    ProvidersProductsFormComponent,
    ModelsComponent,
    ModelFormComponent,
    VehiclesFormComponent,
    TypesComponent,
    ArticlesTypesComponent,
    VehiclesTypesComponent,
    VehiclesTypesFormComponent,
    ArticlesTypesFormComponent,
    ArticlesFormComponent,
    VehiclePageComponent,
    ArticlePageComponent,
    ImagesFormComponent,
    ImagesManagerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class AdminModule { }
