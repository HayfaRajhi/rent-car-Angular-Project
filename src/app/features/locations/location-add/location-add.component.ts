import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
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
    rentalFee: null
  };
vehicles: Vehicle[];


  onLocations() {
    throw new Error('Method not implemented.');
  }

  currentSection: 'client' | 'vehicle' | 'rental' = 'client'; // Track current section
  customers: Customer[] = []; // Array to store existing customers
  filteredCustomers: Customer[] = []; // Array to store filtered customers based on autocomplete input


  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private vehicleService : VehicleService) { }

  
    ngOnInit(): void {
      this.initializeForm();
      this.fetchCustomers();
      this.fetchVehicles();
    }
  
    initializeForm(): void {
      this.locationForm = this.formBuilder.group({
        clientName: ['', Validators.required],
        vehicleId: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        pricePerDay: ['', Validators.required],
        guaranteeType: [''],
        additionalServices: [''],
        insuranceInfo: this.formBuilder.group({
          provider: [''],
          policyNumber: [''],
          expiryDate: ['']
        }),
        driverInfo: this.formBuilder.group({
          licenseNumber: [''],
          expiryDate: ['']
        }),
        notes: [''],
        totalPrice: [{ value: '', disabled: true }]
      });
  
      // Subscribe to changes in start date, end date, and price per day to recalculate total price
      this.locationForm.get('startDate').valueChanges.subscribe(() => this.calculateTotalPrice());
      this.locationForm.get('endDate').valueChanges.subscribe(() => this.calculateTotalPrice());
      this.locationForm.get('pricePerDay').valueChanges.subscribe(() => this.calculateTotalPrice());
    }
  
    fetchCustomers(): void {
      this.customerService.getCustomers().subscribe(customers => {
        this.customers = customers;
      });
    }
  
    fetchVehicles(): void {
      this.vehicleService.getAllVehicles().subscribe(vehicles => {
        this.vehicles = vehicles;
      });
    }
  

  nextSection(section: 'client' | 'vehicle' | 'rental'): void {
    this.currentSection = section;
  }

  // Method to submit the form
  onSubmit(): void {
    if (this.locationForm.valid) {
      // Perform submission logic here
      console.log('Location form submitted successfully');
    } else {
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
      clientName: customer.name,
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
