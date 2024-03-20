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
import { CustomerService } from './services/customer.service';
import { BaseURL } from './shared/baseUrl';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerDetailComponent,
    CustomersListComponent,
    CustomerAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CustomerService,
    {provide : 'BaseURL',useValue:BaseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
