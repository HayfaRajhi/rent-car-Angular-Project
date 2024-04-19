import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  defaultImageUrl = '../../../assets/default-avatar.jpg'; // Provide the path to your default image here




  constructor(private customerService:CustomerService,
    private route:ActivatedRoute,
    private router:Router,
    @Inject('BaseURL') public BaseURL
    ){}

ngOnInit(): void {
this.route.paramMap.subscribe(res=>{     this.idCustomer = parseInt(res.get("id"));
});
// this.customer=this.customerService.getCustomerById(this.idCustomer);
if (!isNaN(this.idCustomer)) {

this.customerService.getCustomerById(this.idCustomer).subscribe(customer=> {this.customer=customer;
  console.log(customer);
  console.log(customer.name);
})
// this.customerService.getCustomerById(this.idCustomer).subscribe((cutomer)=>this.customer=cutomer);
}}
onBack() {
  return this.router.navigateByUrl('/customers')
}
onCustomers() {
  return this.router.navigateByUrl('/customers')
}
onDelete(arg0: number) {
throw new Error('Method not implemented.');
}
  idCustomer :any;
  customer:Customer;


}

