import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './features/customers/customers-list/customers-list.component';
import { CustomerDetailComponent } from './features/customers/customer-detail/customer-detail.component';
import { CustomerAddComponent } from './features/customers/customer-add/customer-add.component';
import { VehicleAddComponent } from './features/vehicles/vehicle-add/vehicle-add.component';
import { VehiclesListComponent } from './features/vehicles/vehicles-list/vehicles-list.component';
import { VehiclesEditComponent } from './features/vehicles/vehicles-edit/vehicles-edit.component';
import { LocationAddComponent } from './features/locations/location-add/location-add.component';

const routes: Routes = [

  {path :'customers',component : CustomersListComponent},
  {path :'vehicles',component : VehiclesListComponent},
  {path :'locations',component: LocationAddComponent},
  {path :'vehicles/edit/:id',component : VehicleAddComponent},
  {path :'customers/edit/:id',component : CustomerAddComponent},
  {path :'customers/:id',component : CustomerDetailComponent},
  { path: 'vehicles/:id', component: VehiclesEditComponent } // Define a route for the vehicle detail component with a parameter ':id'

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
