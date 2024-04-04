import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/shared/models/customer';

@Component({

  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit{

  customerForm:FormGroup;

  customers:Customer[];
  customer: Customer={id:null,name:"test",email:"",birthay:"",licenceNumber:null,phone:null,image:"./images/default-avatar.jpg"};
  constructor(private formBuilder:FormBuilder,
              private router :Router,
              private customerService:CustomerService,
              private route:ActivatedRoute){}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(result=>{
      let id=result.get('id');
      if(id != "-1") this.initCustomer(id);
    });
  }
  initCustomer(id){
    /*let customer:Customer={
      id:id,
      name:this.customerForm.get("name").value,
      email:this.customerForm.get("email").value,
      birthay:this.customerForm.get("birthay").value,
      licenceNumber:this.customerForm.get("licenceNumber").value,
      phone:this.customerForm.get("phone").value,
      image:"../../../assets/default-avatar.jpg"}*/
    this.customerService.getCustomerById(id).subscribe(customer=>{
      this.customer=customer;
      this.customerForm.patchValue(customer);
      
      console.log(this.customer);
   });
  }

  onSubmit(){
    if (this.customer.id == null){

      this.customerService.addCustomer(this.customerForm.value).subscribe(
        customer => {
          console.log('Successfully added new customer', customer);

          this.router.navigate(['/customers/'+customer.id]);
        }
      );
    }
    else {

      this.customerService
      .updateCustomer(this.customer.id,this.customerForm.value)
      .subscribe(
        customer => {
          console.log({customer});
          console.log('Successfully updated new customer', customer);

          
          this.router.navigate(['/customers/'+customer.id])
        }
      );
    }
  }
  



  // Custom validator function for Tunisian phone number
 tunisianPhoneNumber(control) {
  const phoneNumberRegex = /^[0-9]{8}$/;
  if (phoneNumberRegex.test(control.value)) {
    return null; // Valid phone number
  } else {
    return { 'invalidPhoneNumber': true }; // Invalid phone number
  }
}



  initForm():void{

    this.customerForm=this.formBuilder.group(
      {
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email, Validators.pattern("[a-z0-9. %+-]+@[a-z0-9,-]+\.[a-z]{2,4}$")]],
      birthday:['',Validators.required],
      phone: ['', [Validators.required, this.tunisianPhoneNumber]] ,// Add custom validator for Tunisian phone number
      licenseNumber: ['', Validators.required],
      startValidity: ['', Validators.required],
      endValidity: ['', Validators.required],
      image: ['', Validators.required]

      }
    )
  }
onCustomers(){
  this.router.navigateByUrl('/customers');
}

onAddCustomer():void{
  this.onSubmit();
  
   //console.log(this.customerForm.value);

    //this.router.navigateByUrl("/customers");

    };
  

}


//npm ci


