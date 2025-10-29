import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Customer} from "../../../../shared/models/customer";
import {CustomerService} from "../../../../services/customer/customer.service";

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.modal.html',
  styleUrls: ['./add.modal.css']
})

export class AddCustomerComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    public customerService: CustomerService) {

  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    // this.dataService.addIssue(this.data);
  }

  public GetFileOnLoad(event: any) {
    const file = event.target.files[0];
    const element = document.getElementById("fakeFileInput") as HTMLInputElement | null;
    if(element != null) {
      element.value = file?.name;
    }
  }
}
