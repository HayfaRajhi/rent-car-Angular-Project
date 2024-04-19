import {Component, Inject, OnInit} from '@angular/core';
import {VehicleService} from "../../services/vehicule/vehicle.service";
import {Vehicle} from "../../shared/models/vehicle";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: Vehicle[];
  selectedVehicle: Vehicle;
  errMess: string;
  isWaiting: boolean = true;
  constructor(
    private vehicleService: VehicleService,
    @Inject("BaseURL") public baseURL
  ) {
  }

  ngOnInit() {

    this.vehicleService.getAllVehicles().subscribe({
      next: (vehicles) => {
        if (!this.selectedVehicle) {
          this.selectedVehicle = vehicles[0];
        }
        this.dataSource = vehicles;
        this.isWaiting = false;
      },
      error: (error) => {
        this.errMess = <any>error;
        this.isWaiting = false;
        console.log('Error fetching vehicles:', this.errMess);
      },
      complete: () => {
        console.log("complete " + this.isWaiting);
      }
    });
  }

  onSelect(vehicle: Vehicle) {
    this.selectedVehicle = vehicle
  }

  transformDate(date): string {
    return (new Date(date)).toLocaleDateString('sv-SE');
  }

  getVehicleImage(image: string | undefined) {
    if (!image) {
      return '/assets/default-avatar.jpg'
    }

    return this.baseURL + 'api/' + image
  }
}
