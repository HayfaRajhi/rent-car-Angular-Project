import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
onDelete(arg0: number) {
throw new Error('Method not implemented.');
}
  idCustomer :any;
  customer:Customer;
  constructor(private customerService:CustomerService,
              private route:ActivatedRoute,
              private router:Router,
              @Inject('BaseURL') public baseURL
              ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(res=>{     this.idCustomer = parseInt(res.get("id"));
  });
   // this.customer=this.customerService.getCustomerById(this.idCustomer);
   if (!isNaN(this.idCustomer)) {

    this.customerService.getCustomerById(this.idCustomer).subscribe(customer=> {this.customer=customer;})
   // this.customerService.getCustomerById(this.idCustomer).subscribe((cutomer)=>this.customer=cutomer);
  }}
  
}

