import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {CustomerDetailComponent} from './features/customers/customer-detail/customer-detail.component';
import {CustomersListComponent} from './features/customers/customers-list/customers-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomerFormComponent} from './features/customers/customer-form/customer-form.component';
import {HttpClientModule} from '@angular/common/http'
import {CustomerService} from './services/customer/customer.service';
import {BaseURL} from './shared/baseUrl';
import {ConfirmationDialogComponent} from './shared/components/confirmation-dialog/confirmation-dialog.component';
import {VehicleAddComponent} from './features/vehicles/vehicle-add/vehicle-add.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {VehiclesListComponent} from './features/vehicles/vehicles-list/vehicles-list.component';
import {VehiclesEditComponent} from './features/vehicles/vehicles-edit/vehicles-edit.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {ReservationFormComponent} from './features/reservations/reservation-form/reservation-form.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {ReservationsListComponent} from './features/reservations/reservations-list/reservations-list.component';
import {CarRentalListComponent} from './features/carRental/car-rental-list/car-rental-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {httpInterceptorProviders} from '../helpers/HttpRequestInterceptor';

import {MatDialogModule} from '@angular/material/dialog';
import {SigninComponent} from './features/signin/signin/signin.component';
import {NotfoundComponent} from './features/notfound/notfound.component';
import {ProfileComponent} from './features/profile/profile.component';
import {HomeComponent} from './features/home/home.component';
import {ComponentsSidebarComponent} from "./shared/components/components-sidebar/components-sidebar.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from "angular-datatables";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {AddCustomerComponent} from "./features/customers/modals/add/add.modal.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerDetailComponent,
    CustomersListComponent,
    CustomerFormComponent,
    AddCustomerComponent,
    ConfirmationDialogComponent,
    VehicleAddComponent,
    VehiclesListComponent,
    VehiclesEditComponent,
    FooterComponent,
    SidebarComponent,
    ReservationFormComponent,
    ReservationsListComponent,
    CarRentalListComponent,
    SigninComponent,
    ComponentsSidebarComponent,
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
        MatInputModule, MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        BrowserAnimationsModule,
        NgbModule,
        DataTablesModule, MatButtonModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterLink, MatButtonModule, NgIf, NgForOf, MatMenuModule, MatIconModule, MatListModule, MatCardModule, MatDatepickerModule, MatStepperModule, NgOptimizedImage, MatSelectModule,
    ],
  providers: [
    CustomerService,
    MatDialogModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-Us'},
    {provide: 'BaseURL', useValue: BaseURL},
    httpInterceptorProviders
  ],
  exports: [
    ComponentsSidebarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
