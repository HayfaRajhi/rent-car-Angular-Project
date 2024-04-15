import {Injectable} from '@angular/core';
import {Customer} from '../../shared/models/customer';
import {CUSTOMERS} from '../../shared/models/cutomers';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from "../auth/auth.service";
import CONST from "../../../helpers/CONST";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpOptions = {};
  snackBarConfig: MatSnackBarConfig = { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' };

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    const authToken = this.authService.getAuthToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      })
    }
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(CONST.API_URL + "/customers/edit/" + id, customer, this.httpOptions).pipe(
      tap(_ => {
        this.snackBar.open('Customer updated successfully', 'Close', this.snackBarConfig);
      }),
      catchError((error) => {
        this.snackBar.open('Error updating customer', 'Close', this.snackBarConfig);
        return of(error);
      })
    );
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(CONST.API_URL + "/customers/all", this.httpOptions)
  }

  deleteCustomerById(id: number): Observable<any> {
    return this.httpClient.delete<any>(CONST.API_URL + "/customers/" + id, this.httpOptions).pipe(
      tap(_ => {
        this.snackBar.open('Customer deleted successfully', 'Close', this.snackBarConfig);
      }),
      catchError(error => {
        this.snackBar.open('Error deleting customer', 'Close', this.snackBarConfig);
        return of(error);
      })
    );
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>(CONST.API_URL + "/customers/" + id, this.httpOptions);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(CONST.API_URL + "/customers/add", customer, this.httpOptions).pipe(
      tap(_ => {
        this.snackBar.open("Customer added successfully", 'Close', this.snackBarConfig);
      }),
      catchError(error => {
        this.snackBar.open('Error adding customer', 'Close', this.snackBarConfig);
        return of(error);
      })
    );
  }
}
