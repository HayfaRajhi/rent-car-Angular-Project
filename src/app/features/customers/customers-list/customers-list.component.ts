import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { UserService } from 'src/app/services/user/user.service';
import { Customer } from 'src/app/shared/models/customer';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit{

  customers:Customer[]=[]
  defaultImageUrl = '../../../assets/default-avatar.jpg'; // Provide the path to your default image here
  errMess:string;
  isWaiting:boolean=true;
  content?: string;

  public constructor(private router:Router,
    private userService: UserService, private customerService:CustomerService,@Inject("BaseURL") public BaseURL){}
  ngOnInit(): void {
    //this.customers=this.customerService.getCustomers();
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });

    this.customerService.getAllCustomers().subscribe
    ({next:(customers)  =>{this.customers=customers,this.isWaiting=false;
      customers.forEach(element => {
        console.log(element.licence_number)

      });
    },
    error:(errmess)=>{this.customers=[];
      this.errMess=<any>errmess;this.isWaiting=false;},
      complete:()=> {console.log("complete "+this.isWaiting);}});


    }


 /*   console.log('Customers:', this.customers); // Log the fetched customers  for debugging
  },
  error => {
    console.error('Error fetching customers:', error); // Log any errors
  });
  }*/


  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this vehicle?')) {

    this.customerService.deleteCustomerById(id)
        .subscribe({
            next: () => {
              this.isWaiting=false;

                console.log("Customer deleted successfully!");
                const index = this.customers.findIndex(customer => customer.id === id);
                if (index !== -1) {
                    this.customers.splice(index, 1);

                }
            },
            error: (error) => {
                console.error("Error deleting customer:", error);
                // Handle error as needed, e.g., show an error message to the user
            }
        });
      }
}

 /* onDelete(id:number){

//    this.customerService.deleteCustomerById(id);
    this.customerService.deleteCustomerById(id).subscribe(res =>{
      let index =this.customers.findIndex(customer =>customer.id ==id);
      return this.customers.splice(index,1);
    });
  }*/

  onAddCustomer(){
    this.router.navigateByUrl('/customers/edit/-1');
  }










}
