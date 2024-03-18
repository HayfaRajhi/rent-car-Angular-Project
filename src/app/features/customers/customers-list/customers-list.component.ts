import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit{

  customers:Customer[]
  public constructor(private router:Router, private customerService:CustomerService){}
  ngOnInit(): void {
    this.customers=this.customerService.getCustomers();
    console.log('Customers:', this.customers); // Log the customers array for debugging

  }

  onDelete(id:number){
    this.customerService.deleteCustomerById(id);
  }

  onAddCustomer(){

  }

  






}
