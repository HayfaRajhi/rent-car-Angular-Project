import { Injectable } from '@angular/core';
import { Customer } from '../shared/models/customer';
import { CUSTOMERS } from '../shared/models/cutomers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers :Customer[]= CUSTOMERS

  constructor() { }

  getCustomers():Customer[]{
    return this.customers
  }

  deleteCustomerById(id:number):Customer[]{
    let index=this.customers.findIndex(customer =>customer.id==id)
    return this.customers.splice(index,1)
  }

  addCustomer(customer:Customer):void{
    customer.id=this.customers[this.customers.length-1].id+1;
    this.customers.push(customer)
  }

  getCustomerById(id:number):Customer{
    return this.customers.find(customer=>customer.id==id);
  }

}
