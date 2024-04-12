import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CustomerDetailComponent } from './features/customers/customer-detail/customer-detail.component';
import { CustomersListComponent } from './features/customers/customers-list/customers-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerAddComponent } from './features/customers/customer-add/customer-add.component';
import {HttpClientModule } from '@angular/common/http'
import { CustomerService } from './services/customer/customer.service';
import { BaseURL } from './shared/baseUrl';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { VehicleAddComponent } from './features/vehicles/vehicle-add/vehicle-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehiclesListComponent } from './features/vehicles/vehicles-list/vehicles-list.component';
import { VehiclesEditComponent } from './features/vehicles/vehicles-edit/vehicles-edit.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { LocationAddComponent } from './features/locations/location-add/location-add.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { LocationsListComponent } from './features/locations/locations-list/locations-list.component';
import { CarRentalListComponent } from './features/carRental/car-rental-list/car-rental-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { httpInterceptorProviders } from '../helpers/HttpRequestInterceptor';


import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SigninComponent } from './features/signin/signin/signin.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { ProfileComponent } from './features/profile/profile.component';
import { HomeComponent } from './features/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerDetailComponent,
    CustomersListComponent,
    CustomerAddComponent,
    ConfirmationDialogComponent,
    VehicleAddComponent,
    VehiclesListComponent,
    VehiclesEditComponent,
    FooterComponent,
    SidebarComponent,
    LocationAddComponent,
    LocationsListComponent,
    CarRentalListComponent,
    SigninComponent,
    NotfoundComponent,
    ProfileComponent,
    HomeComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,   MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    CustomerService,
    MatDialogModule,
    {provide : 'BaseURL',useValue:BaseURL},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
