import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Customer } from 'src/app/shared/models/customer';

@Component({

  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit{

  customerForm:FormGroup;

  customers:Customer[];
  customer: Customer={id:null,name:"test",email:"",birthay:"",licence_number:null,phone:null,image:"./images/default-avatar.jpg"};
  constructor(private formBuilder:FormBuilder,
              private router :Router,
              private customerService:CustomerService,
              private route:ActivatedRoute,
              private fileUploadService: FileUploadService)
              {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(result=>{
      let id=result.get('id');

      if(id != "-1") this.initCustomer(id);
    });
  }

   /* upload file*/
   selectedFiles?: FileList;
   currentFile?: File;
   progress = 0;
   message = '';
 
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
        (customer:Customer) => {
          this.upload(customer.id);
          console.log('Successfully added new customer', customer);

          this.router.navigate(['/customers/'+customer.id]);
        }
      );
    }
    else {
console.log("heu")
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
      licence_number: ['', Validators.required],
      startValidity: ['', Validators.required],
            //image: ['', Validators.required],
      endValidity: ['', Validators.required]

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
   /*upload file*/
   selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(id: number): void {
    
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.fileUploadService.upload(this.currentFile,id,"Customer").subscribe({
          next: (event: any) => {  
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total); 
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.router.navigateByUrl('/customers/' +id);
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }

}



//npm ci


