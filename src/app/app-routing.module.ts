import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersListComponent} from './features/customers/customers-list/customers-list.component';
import {CustomerDetailComponent} from './features/customers/customer-detail/customer-detail.component';
import {CustomerFormComponent} from './features/customers/customer-form/customer-form.component';
import {VehicleFormComponent} from './features/vehicles/vehicle-form/vehicle-form.component';
import {VehiclesListComponent} from './features/vehicles/vehicles-list/vehicles-list.component';
import {VehiclesDetailComponent} from './features/vehicles/vehicles-detail/vehicles-detail.component';
import {ReservationFormComponent} from './features/reservations/reservation-form/reservation-form.component';
import {AuthGuard} from './features/guards/auth.guard';
import {SigninComponent} from './features/signin/signin/signin.component';
import {NotfoundComponent} from './features/notfound/notfound.component';
import {HomeComponent} from './features/home/home.component';
import {ReservationsListComponent} from "./features/reservations/reservations-list/reservations-list.component";

const routes: Routes = [
  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  {path: '', canActivate: [AuthGuard], component: HomeComponent},

  {path: 'customers', canActivate: [AuthGuard], component: CustomersListComponent},
  {path: 'customers/edit/:id', canActivate: [AuthGuard], component: CustomerFormComponent},
  {path: 'customers/add', canActivate: [AuthGuard], component: CustomerFormComponent},
  {path: 'customers/:id', canActivate: [AuthGuard], component: CustomerDetailComponent},

  {path: 'vehicles', canActivate: [AuthGuard], component: VehiclesListComponent},
  {path: 'vehicles/edit/:id', canActivate: [AuthGuard], component: VehicleFormComponent},
  {path: 'vehicles/add', canActivate: [AuthGuard], component: VehicleFormComponent},
  {path: 'vehicles/:id', canActivate: [AuthGuard], component: VehiclesDetailComponent}, // Define a route for the vehicle detail component with a parameter ':id'

  {path: 'locations', canActivate: [AuthGuard], component: ReservationsListComponent},
  {path: 'locations/edit/:id', canActivate: [AuthGuard], component: ReservationFormComponent},
  {path: 'locations/add', canActivate: [AuthGuard], component: ReservationFormComponent},
  {path: 'locations/:id', canActivate: [AuthGuard], component: ReservationFormComponent},

  {path: 'signin', component: SigninComponent},
  {path: "**",canActivate: [AuthGuard], component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
