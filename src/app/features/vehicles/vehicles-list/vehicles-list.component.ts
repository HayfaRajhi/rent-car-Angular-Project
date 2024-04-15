import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {VehicleService} from 'src/app/services/vehicule/vehicle.service';
import {Vehicle} from 'src/app/shared/models/vehicle';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'registration', 'brand', 'model', 'pricePerDay', 'status', 'dateOfRegistration', 'actions'];
  dataSource: MatTableDataSource<Vehicle>;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  errMess: string;
  isWaiting: boolean = true;

  defaultImageUrl = '../../../assets/default-avatar.jpg'; // Provide the path to your default image here

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    @Inject("BaseURL") public baseURL
  ) {

  }

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe({
      next: (vehicles) => {
        this.dataSource = new MatTableDataSource(vehicles);
        this.dataSource.paginator = this.paginator
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewVehicleDetail(id: number) {
    this.router.navigate(['/vehicles', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(id);
    }
  }

  onAdd() {
    this.router.navigateByUrl('/vehicles/add');
  }
}
