import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { LocationService } from 'src/app/services/location.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Customer } from 'src/app/shared/models/customer';
import { RentalLocation } from 'src/app/shared/models/location';
import { Vehicle } from 'src/app/shared/models/vehicle';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {
  locationForm: FormGroup;

  location: RentalLocation = {
    id: null,
    startDate: null,
    endDate: null,
    customer: null,
    vehicle: null,
    guaranteeType: null,
    rentalFee: null,
    totalPrice :null
  };
vehicles: Vehicle[];
  minStartDate: string; // Holds the minimum date for start date
  minEndDate: string; // Holds the minimum date for end date
  startDateFilled: boolean = false;

  onLocations() {
    throw new Error('Method not implemented.');
  }

  currentSection: 'client' | 'vehicle' | 'rental' = 'client'; // Track current section
  customers: Customer[] = []; // Array to store existing customers
  filteredCustomers: Customer[] = []; // Array to store filtered customers based on autocomplete input


  constructor(private formBuilder: FormBuilder,
    private locationService: LocationService,
    private customerService: CustomerService,
    private vehicleService : VehicleService,
    private router :Router,
    private route :ActivatedRoute) { }

  
    ngOnInit(): void {
      this.fetchCustomers();
      this.fetchVehicles();
      this.initializeForm();
      this.setMinDate(); // Set minimum date for start date field
      this.updateOrDelete();
      this.locationForm.get('endDate').disable(); // Disable end date if start date is empty

    }
    private setMinDate(): void {
      const today = new Date();
      // Format today's date as YYYY-MM-DD (required for input type date)
      this.minStartDate = today.toISOString().split('T')[0];
      this.minEndDate = today.toISOString().split('T')[0];
    }
    setMinEndDate(): void {
      const startDate = this.locationForm.get('startDate').value;
      const startDateObj = new Date(startDate);
      console.log(startDate)
      // Add one day to start date
      startDateObj.setDate(startDateObj.getDate() + 1);
    
      // Convert the date to the yyyy-mm-dd format
      const minEndYear = startDateObj.getFullYear();
      const minEndMonth = ('0' + (startDateObj.getMonth() + 1)).slice(-2); // Add leading zero if necessary
      const minEndDay = ('0' + startDateObj.getDate()).slice(-2); // Add leading zero if necessary
      this.minEndDate = `${minEndYear}-${minEndMonth}-${minEndDay}`;
    }
    
    
 
    private initializeForm(): void {
      this.locationForm = this.formBuilder.group({
        customer: [null, Validators.required], // Assuming customer is a form control for the Customer object
        vehicle: [null, Validators.required],
        startDate: ['', Validators.required],
        endDate: [ Validators.required], // Initially disabled
        pricePerDay: [ {value:'',disabled: true}],
        guaranteeType: [''],
        insuranceInfo: this.formBuilder.group({
          provider: [''],
          policyNumber: [''],
          expiryDate: ['']
        }),
        driverInfo: this.formBuilder.group({
          licenseNumber: [''],
          expiryDate: ['']
        }),
        totalPrice: [{ value: '', disabled: true }]
      });
     // Subscribe to changes in vehicleId to update pricePerDay
     this.locationForm.get('vehicle').valueChanges.subscribe(vehicle => {
      const selectedVehicle = this.vehicles.find(v => v === vehicle);
      console.log(selectedVehicle)
      console.log(vehicle)
      console.log(this.vehicles)
      if (selectedVehicle) {
        this.locationForm.patchValue({
          pricePerDay: selectedVehicle.pricePerDay // Update pricePerDay based on selected vehicle
        });
      }});
// Subscribe to changes in start date to enable/disable end date and recalculate total price
this.locationForm.get('startDate').valueChanges.subscribe(() => {
  this.startDateFilled = !!this.locationForm.get('startDate').value;
  if (!this.startDateFilled) {
    (console.log(this.startDateFilled))
    this.locationForm.get('endDate').disable(); // Disable end date if start date is empty
  } else {
    this.locationForm.get('endDate').enable(); // Enable end date if start date is filled
    this.setMinEndDate();

  }
  // Recalculate total price or perform other necessary actions...
});

      // Subscribe to changes in start date, end date, and price per day to recalculate total price
      this.locationForm.get('startDate').valueChanges.subscribe(() => this.calculateTotalPrice());
      this.locationForm.get('endDate').valueChanges.subscribe(() => this.calculateTotalPrice());
      this.locationForm.get('pricePerDay').valueChanges.subscribe(() => this.calculateTotalPrice());
    
    
    }
  
    private fetchCustomers(): void {
      this.customerService.getAllCustomers().subscribe(customers => {
        this.customers = customers;
      });
    }
  
    private fetchVehicles(): void {
      this.vehicleService.getAllVehicles().subscribe(vehicles => {
        this.vehicles = vehicles;
      });
    }
  
     private initLocation(id){
      this.locationService.getLocationById(id).subscribe(location=>{
        this.location=location;
        this.locationForm.patchValue(Location);
        console.log(this.location);
     });
    }

    private addNewLocation():void{
      this.locationService.createLocation(this.locationForm.value).subscribe(
        location => {
          console.log("locations added Successfully .."+location)
          this.router.navigate(['/locations/'+location.id]);
        }
      )
    }
    private updateLocation():void{
      const formData = { ...this.locationForm.value };
      this.vehicleService.updateVehicle(this.location.id,formData).subscribe(
        (location)=>{
        console.log("locations updated Successfully .."+location)
        this.router.navigate(['/locations/'+location]);
        })
    }

    private updateOrDelete():void{
      this.route.paramMap.subscribe(
        (result)=>{
          let id = result.get('id');
          if (id!="-1"){
            this.initLocation(id)
          }
        }
      )
    }








  nextSection(section: 'client' | 'vehicle' | 'rental'): void {
    this.currentSection = section;
  }

  // Method to submit the form
  onSubmit(): void {
    if (this.locationForm.valid) {
      console.log('Location form submitted successfully');
      if( this.location.id==null){
        this.addNewLocation();
      }
      else this.updateLocation();
    }
   else {
      // Mark all fields as touched to display validation messages
      this.locationForm.markAllAsTouched();
    }
  }
  // Method to filter customers based on the entered text in the autocomplete input
  filterCustomers(value: string): void {
    if (value) {
      const filterValue = value.toLowerCase();
      console.log(filterValue)
      this.filteredCustomers = this.customers.filter(customer => customer.name.toLowerCase().includes(filterValue));
    } else {
      this.filteredCustomers = this.customers;
    }
  }

  // Method to display the customer's name in the autocomplete input
  displayCustomerName(customer: Customer): string {
    return customer ? customer.name : '';
  }


  // Method to select a customer from the filtered list
  selectCustomer(customer: Customer): void {
    this.locationForm.patchValue({
      customer: customer,
      // Update other client information fields if needed
    });
    this.filteredCustomers = []; // Clear the filtered list after selecting a customer
  }

  calculateTotalPrice(): void {
    const startDate = new Date(this.locationForm.get('startDate').value);
    const endDate = new Date(this.locationForm.get('endDate').value);
    const pricePerDay = this.locationForm.get('pricePerDay').value;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days * pricePerDay;
    this.locationForm.get('totalPrice').setValue(totalPrice);
  }
}
