import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CustomerService} from 'src/app/services/customer/customer.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "../../../shared/models/customer";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'license', 'validity', 'status', 'actions'];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }

  defaultImageUrl = '../../../assets/default-avatar.jpg'; // Provide the path to your default image here
  errMess: string;
  isWaiting: boolean = true;
  content?: string;

  public constructor(
    private router: Router,
    private customerService: CustomerService
  ) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.customerService
      .getAllCustomers()
      .subscribe({
        next: (customers) => {
          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(customers);
          this.dataSource.paginator = this.paginator
          this.isWaiting = false;
        },
        error: (error) => {
          this.errMess = <any>error;
          this.isWaiting = false;
        },
      });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.customerService.deleteCustomerById(id);
    }
  }

  onAddCustomer() {
    this.router.navigateByUrl('/customers/add');
  }
}
