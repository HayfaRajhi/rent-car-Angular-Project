import {Component, Inject, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReservationService} from "../../../services/reservation/reservation.service";
import {Reservation} from "../../../shared/models/location";

@Component({
  selector: 'app-locations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent {

  displayedColumns: string[] = [
    'id',
    'startDate',
    'endDate',
    'customer',
    'vehicle',
    'guaranteeType',
    'rentalFee',
    'totalPrice',
    'actions'
  ];
  dataSource: MatTableDataSource<Reservation>;

  errMess: string;
  isWaiting: boolean = true;
  content?: string;

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

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    @Inject("BaseURL") public baseURL
  ) {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator
    this.isWaiting = false;
  }

  ngOnInit(): void {
    /*this.reservationService
      .getAllReservations()
      .subscribe({
        next: (reservations) => {
          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(reservations);
          this.dataSource.paginator = this.paginator
          this.isWaiting = false;
        },
        error: (error) => {
          this.errMess = <any>error;
          this.isWaiting = false;
        },
      });*/
  }

  onAdd() {
    this.router.navigateByUrl('/locations/add');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this Reservation?')) {
      this.reservationService.deleteReservation(id);
    }
  }

}
