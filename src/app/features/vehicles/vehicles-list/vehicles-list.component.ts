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
onFilterChange() {
  console.log('Filter text:', this.searchQuery);
  this.applyFilter()
}

  vehicles$: Observable<Vehicle[]>;
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  searchQuery: string = '';

  constructor(private router: Router, 
    private vehicleService: VehicleService,
     @Inject("BaseURL") public baseURL) { }

  ngOnInit(): void {
    this.vehicles$ = this.vehicleService.getAllVehicles();
    this.vehicleService.getAllVehicles().subscribe(res => {
      this.vehicles = res;
      this.applyFilter(); // Apply filter when vehicles are loaded
    }),
    (error) => {
      console.log('Error fetching vehicles:', error);
    };
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
      this.vehicleService.deleteVehicle(id).subscribe(() => {
        this.vehicles$ = this.vehicleService.getAllVehicles();
      });
    }
  }

  onAdd() {
    this.router.navigateByUrl('/vehicles/edit/-1');
  }
}
