import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from 'src/app/services/customer/customer.service';
import {FileUploadService} from 'src/app/services/file-upload.service';
import {Customer} from 'src/app/shared/models/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  id: string = null;

  /* upload file*/
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    //private fileUploadService: FileUploadService
  ) {
    this.route.paramMap.subscribe(result => {
      this.id = result.get('id');
      if (!this.id) {
        return
      }
      this.initCustomer()
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initCustomer() {
    this.customerService
      .getCustomerById(this.id)
      .subscribe(
        (customer: Customer) => this.customerForm.patchValue(customer)
      );
  }

  onSubmit() {
    if (this.router.isActive('/customers/add', true)) {
      console.log('Submit')
      return this.customerService.addCustomer(this.customerForm.value);
    }

    return this.customerService.updateCustomer(this.id, this.customerForm.value)
  }

  initForm(): void {
    this.customerForm = this.formBuilder.group(
      {
        id: [null],
        name: ['', Validators.required],
        email: ['@mail.com', [Validators.required, Validators.email, Validators.pattern("[a-z0-9. %+-]+@[a-z0-9,-]+\.[a-z]{2,4}$")]],
        birthday: ['', Validators.required],
        phone: ['', [Validators.required, this.tunisianPhoneNumber]],// Add custom validator for Tunisian phone number
        licence_number: ['', Validators.required],
        startValidity: ['', Validators.required],
        //image: ['', Validators.required],
        endValidity: ['', Validators.required],
      }
    )
  }

  onCustomers() {
    this.router.navigateByUrl('/customers');
  }

  onAddCustomer(): void {
    this.onSubmit().subscribe(
      (customer: Customer) => {
        if (this.router.isActive('/customers/add', true)) {
        //  this.upload(customer.id);
        }
         this.router.navigate(['/customers/' + customer.id]);
      });
  };

  /*upload file
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(id: number): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.fileUploadService.upload(this.currentFile, id, "Customer").subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.router.navigateByUrl('/customers/' + id);
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
  }*/

  // Custom validator function for Tunisian phone number
  tunisianPhoneNumber(control) {
    const phoneNumberRegex = /^[0-9]{8}$/;
    if (phoneNumberRegex.test(control.value)) {
      return null; // Valid phone number
    } else {
      return { 'invalidPhoneNumber': true }; // Invalid phone number
    }
  }
}

