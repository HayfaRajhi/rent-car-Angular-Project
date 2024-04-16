import {Component, Inject, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer/customer.service";
import {VehicleService} from "../../services/vehicule/vehicle.service";
import {ReservationService} from "../../services/reservation/reservation.service";
import {Vehicle} from "../../shared/models/vehicle";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customerCount: number;
  vehicleCount: number;
  reservationCount: number;
  filterValue = '';
  vehicles = [];
  selectedVehicle: Vehicle;

  constructor(
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private reservationService: ReservationService,
    @Inject("BaseURL") public baseURL
  ) {
  }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(data => {
      this.customerCount = data.length

    });
    this.vehicleService.getAllVehicles().subscribe(data => {
      this.vehicles = data;
      if (!this.selectedVehicle) {
        this.selectedVehicle = this.vehicles[0];
      }
      this.vehicleCount = data.length
    });
    this.reservationService.getAllReservations().subscribe(data => this.reservationCount = data.length);
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
