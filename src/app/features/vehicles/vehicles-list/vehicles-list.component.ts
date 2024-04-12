import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/shared/models/vehicle';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  errMess:string;
  isWaiting:boolean=true;

  vehicles$: Observable<Vehicle[]>;
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  searchQuery: string = '';

  defaultImageUrl = '../../../assets/default-avatar.jpg'; // Provide the path to your default image here


  constructor(private router: Router, 
    private vehicleService: VehicleService,
     @Inject("BaseURL") public baseURL) { }

  ngOnInit(): void {
    this.vehicles$ = this.vehicleService.getAllVehicles();
    this.vehicleService.getAllVehicles().subscribe({next:(vehicles) => {
      this.vehicles = vehicles;
      console.log(vehicles)
      this.isWaiting=false;
      this.applyFilter(); // Apply filter when vehicles are loaded
    

  },
  error:(errmess)=>{this.vehicles=[];
    this.errMess=<any>errmess;this.isWaiting=false;
    console.log('Error fetching vehicles:', this.errMess);},
    complete:()=> {console.log("complete "+this.isWaiting);}
  });

  }
onFilterChange() {
  console.log('Filter text:', this.searchQuery);
  this.applyFilter()
}


  

  applyFilter() {
    if (this.searchQuery.trim() === '') {
      console.log(this.searchQuery)
      this.filteredVehicles = this.vehicles; // No search query, display all vehicles
    } else {
      this.filteredVehicles = this.vehicles.filter(vehicle =>
        vehicle.model.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        vehicle.registration.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  viewVehicleDetail(id: number) {
    this.router.navigate(['/vehicles', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(id)
      .subscribe({next:() => {
      //  this.vehicles$ = this.vehicleService.getAllVehicles();
        this.isWaiting=false;
        console.log("Vehicle deleted successfully!");
        const index = this.vehicles.findIndex(vehicle => vehicle.id === id);
        if (index !== -1) {
            this.vehicles.splice(index, 1);
        }},


error:(errmess)=>{this.vehicles=[];
  this.errMess=<any>errmess;this.isWaiting=false;
  console.log('Error fetching vehicles:', this.errMess);},
  complete:()=> {console.log("complete "+this.isWaiting);}

      });
    }
  }


  onAdd() {
    this.router.navigateByUrl('/vehicles/edit/-1');
  }
}
