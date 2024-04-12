import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './features/customers/customers-list/customers-list.component';
import { CustomerDetailComponent } from './features/customers/customer-detail/customer-detail.component';
import { CustomerAddComponent } from './features/customers/customer-add/customer-add.component';
import { VehicleAddComponent } from './features/vehicles/vehicle-add/vehicle-add.component';
import { VehiclesListComponent } from './features/vehicles/vehicles-list/vehicles-list.component';
import { VehiclesEditComponent } from './features/vehicles/vehicles-edit/vehicles-edit.component';
import { LocationAddComponent } from './features/locations/location-add/location-add.component';
import { LocationsListComponent } from './features/locations/locations-list/locations-list.component';
import { CarRentalListComponent } from './features/carRental/car-rental-list/car-rental-list.component';
import { AppComponent } from './app.component';
import { authGuard } from './features/guards/auth.guard';
import { SigninComponent } from './features/signin/signin/signin.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  {path:'',canActivate:[authGuard],component:AppComponent},  

  {path :'customers',canActivate:[authGuard],component : CustomersListComponent},
  {path :'vehicles',canActivate:[authGuard],component : VehiclesListComponent},
  {path :'locations',canActivate:[authGuard],component: CarRentalListComponent},
  {path :'vehicles/edit/:id',canActivate:[authGuard],component : VehicleAddComponent},
  {path :'customers/edit/:id',canActivate:[authGuard],component : CustomerAddComponent},
  {path :'locations/edit/:id',canActivate:[authGuard],component :LocationAddComponent},
  {path :'customers/:id',canActivate:[authGuard],component : CustomerDetailComponent},
  { path: 'vehicles/:id', canActivate:[authGuard],component: VehiclesEditComponent }, // Define a route for the vehicle detail component with a parameter ':id'
  {path:'signin',component:SigninComponent},
  {path:"**",component:NotfoundComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
