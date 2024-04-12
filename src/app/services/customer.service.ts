import { Inject, Injectable } from '@angular/core';
import { Customer } from '../shared/models/customer';
import { CUSTOMERS } from '../shared/models/cutomers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  customers :Customer[]= CUSTOMERS

  httpOptions= {
    headers: new HttpHeaders({

      'content-Type': 'application/json'
    })
  };
  constructor(private httpClient :HttpClient,@Inject('BaseURL') private baseURL) { }


  updateCustomer(id: number,customer: Customer) :Observable<Customer>{
    console.log(id)
    return this.httpClient.put<Customer>(this.baseURL+"customers/edit/"+id,customer,this.httpOptions);
  }
  getAllCustomers():Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(this.baseURL+"customers")
  }

  deleteCustomerById(id:number):Observable<any>{
   // let index=this.customers.findIndex(customer =>customer.id==id)
    //return this.customers.splice(index,1)
    return this.httpClient.delete<any>(this.baseURL+"customers/"+id);
  }

  getCustomerById(id:number):Observable<Customer>{
   // return this.customers.find(customer=>customer.id==id);
   return this.httpClient.get<Customer>(this.baseURL+"customers/"+id);

  }

  /*
  addCustomer(customer:Customer):void{
    customer.id=this.customers[this.customers.length-1].id+1;
    this.customers.push(customer)
  }*/
  addCustomer(customer:Customer):Observable<Customer>{

    return this.httpClient.post<Customer>(this.baseURL+"customers/edit/"+customer.id,customer,this.httpOptions);

  }

}
