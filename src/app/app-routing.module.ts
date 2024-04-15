import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersListComponent} from './features/customers/customers-list/customers-list.component';
import {CustomerDetailComponent} from './features/customers/customer-detail/customer-detail.component';
import {CustomerFormComponent} from './features/customers/customer-form/customer-form.component';
import {VehicleAddComponent} from './features/vehicles/vehicle-add/vehicle-add.component';
import {VehiclesListComponent} from './features/vehicles/vehicles-list/vehicles-list.component';
import {VehiclesEditComponent} from './features/vehicles/vehicles-edit/vehicles-edit.component';
import {LocationAddComponent} from './features/locations/location-add/location-add.component';
import {CarRentalListComponent} from './features/carRental/car-rental-list/car-rental-list.component';
import {AppComponent} from './app.component';
import {AuthGuard} from './features/guards/auth.guard';
import {SigninComponent} from './features/signin/signin/signin.component';
import {NotfoundComponent} from './features/notfound/notfound.component';
import {HomeComponent} from './features/home/home.component';

const routes: Routes = [
  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  {path: '', canActivate: [AuthGuard], component: AppComponent},

  {path: 'customers', canActivate: [AuthGuard], component: CustomersListComponent},
  {path: 'customers/edit/:id', canActivate: [AuthGuard], component: CustomerFormComponent},
  {path: 'customers/add', canActivate: [AuthGuard], component: CustomerFormComponent},
  {path: 'customers/:id', canActivate: [AuthGuard], component: CustomerDetailComponent},

  {path: 'vehicles', canActivate: [AuthGuard], component: VehiclesListComponent},
  {path: 'vehicles/edit/:id', canActivate: [AuthGuard], component: VehicleAddComponent},
  {path: 'vehicles/add', canActivate: [AuthGuard], component: VehicleAddComponent},
  {path: 'vehicles/:id', canActivate: [AuthGuard], component: VehiclesEditComponent}, // Define a route for the vehicle detail component with a parameter ':id'

  {path: 'locations', canActivate: [AuthGuard], component: CarRentalListComponent},
  {path: 'locations/edit/:id', canActivate: [AuthGuard], component: LocationAddComponent},

  {path: 'signin', component: SigninComponent},
  {path: "**", component: NotfoundComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
