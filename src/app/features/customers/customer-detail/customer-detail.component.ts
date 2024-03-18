import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  idCustomer :any;
  customer:Customer;
  constructor(private customerService:CustomerService,
              private route:ActivatedRoute,
              private router:Router,
              ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(res=>{ this.idCustomer=res.get("id")});
    this.customer=this.customerService.getCustomerById(this.idCustomer);

   // this.customerService.getCustomerById(this.idCustomer).subscribe((cutomer)=>this.customer=cutomer);
  }
}

