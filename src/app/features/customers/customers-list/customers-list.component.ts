import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/shared/models/customer';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit{

  customers:Customer[]=[]
  public constructor(private router:Router, private customerService:CustomerService,@Inject("BaseURL") public BaseURL){}
  ngOnInit(): void {
    //this.customers=this.customerService.getCustomers();

    this.customerService.getCustomers().subscribe(res =>{this.customers=res;});
    console.log('Customers:', this.customers); // Log the customers array for debugging

  }

  onDelete(id:number){

//    this.customerService.deleteCustomerById(id);
    this.customerService.deleteCustomerById(id).subscribe(res =>{
      let index =this.customers.findIndex(customer =>customer.id ==id);
      return this.customers.splice(index,1);
    });
  }

  onAddCustomer(){
    this.router.navigateByUrl('/customers/edit/-1');
  }





 




}
