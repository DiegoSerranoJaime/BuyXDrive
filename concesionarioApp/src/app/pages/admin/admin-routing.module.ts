import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ProvidersComponent } from './providers/providers.component';
import { ProvidersProductsComponent } from './providers-products/providers-products.component';
import { EmployersComponent } from './employers/employers.component';
import { ProductsComponent } from './products/products.component';
import { AdminVehiclesComponent } from './products/admin-vehicles/admin-vehicles.component';
import { AdminArticlesComponent } from './products/admin-articles/admin-articles.component';
import { OrderComponent } from '../user/order/order.component';
import { BrandsComponent } from './brands/brands.component';
import { ModelsComponent } from './models/models.component';
import { TypesComponent } from './types/types.component';
import { ArticlesTypesComponent } from './types/articles-types/articles-types.component';
import { VehiclesTypesComponent } from './types/vehicles-types/vehicles-types.component';
import { VehiclePageComponent } from './products/vehicle-page/vehicle-page.component';
import { ArticlePageComponent } from './products/article-page/article-page.component';

const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'users', component: UsersComponent },
    { path: 'users/:id', component: UserPageComponent },
    { path: 'users/:userId/order/:id', component: OrderComponent },
    { path: 'orders', component: AllOrdersComponent },
    { path: 'orders/:id', component: OrderComponent },
    { path: 'providers', component: ProvidersComponent },
    { path: 'providers/:id', component: ProvidersProductsComponent },
    { path: 'employers', component: EmployersComponent },
    { path: 'employers/:id', component: UserPageComponent },
    { path: 'brands', component: BrandsComponent },
    { path: 'brands/:id', component: ModelsComponent },
    { path: 'products', component: ProductsComponent, children:
    [
      { path: 'vehicles', component: AdminVehiclesComponent },
      { path: 'vehicles/:id', component: VehiclePageComponent },
      { path: 'articles', component: AdminArticlesComponent },
      { path: 'articles/:id', component: ArticlePageComponent },
      { path: '**', redirectTo: 'vehicles' }
    ]},
    { path: 'types', component: TypesComponent, children:
    [
      { path: 'vehicles', component: VehiclesTypesComponent },
      { path: 'articles', component: ArticlesTypesComponent },
      { path: '**', redirectTo: 'vehicles' }
    ]},
    { path: '**', pathMatch: 'full', redirectTo: 'users' }
  ]},
  { path: '**', pathMatch: 'full', redirectTo: 'users' }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
