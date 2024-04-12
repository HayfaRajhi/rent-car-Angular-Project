import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';
import { RentalLocation } from 'src/app/shared/models/location';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDetailComponent } from '../../customers/customer-detail/customer-detail.component';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-car-rental-list',
  templateUrl: './car-rental-list.component.html',
  styleUrls: ['./car-rental-list.component.css']
})
export class CarRentalListComponent  implements OnInit{
  constructor(private router :Router,
              private locationService: LocationService,
              private dialog: MatDialog){}
onAdd() {
  this.router.navigateByUrl('/locations/edit/-1');

}
rentalLocations: RentalLocation[];


  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe(
      locations => {
        this.rentalLocations = locations;
      },
      error => {
        console.log('Error fetching rental locations:', error);
      }
    );
  }

showCustomerDetails(customer: Customer): void {
  const dialogRef = this.dialog.open(CustomerDetailComponent, {
    width: '400px', // Set the width of the dialog
    data: { customer } // Pass the customer object to the dialog
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}
