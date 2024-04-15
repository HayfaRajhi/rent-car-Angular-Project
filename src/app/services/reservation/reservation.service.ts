import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Reservation} from '../../shared/models/location';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";
import {catchError, tap} from "rxjs/operators";
import CONST from "../../../helpers/CONST";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
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

  getAllReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(CONST.API_URL + '/locations/', this.httpOptions);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(CONST.API_URL + '/locations/' + id, this.httpOptions);
  }

  createReservation(location: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(CONST.API_URL + "/locations/", location, this.httpOptions).pipe(
      tap(_ => {
        this.snackBar.open('Reservation created successfully', 'Close', this.snackBarConfig);
      }),
      catchError((error) => {
        this.snackBar.open('Error creating reservation', 'Close', this.snackBarConfig);
        return of(error);
      })
    );
  }

  updateReservation(id: number, location: Reservation): Observable<Reservation> {
    return this.httpClient.put<Reservation>(CONST.API_URL + "/locations/" + id, location, this.httpOptions).pipe(
      tap(_ => {
        this.snackBar.open('Reservation updated successfully', 'Close', this.snackBarConfig);
      }),
      catchError((error) => {
        this.snackBar.open('Error updating reservation', 'Close', this.snackBarConfig);
        return of(error);
      })
    );
  }

  deleteReservation(id: number): Observable<Reservation> {
    return this.httpClient.delete<Reservation>(CONST.API_URL + '/locations/' + id, this.httpOptions).pipe(
      tap(_ => {
        this.snackBar.open('Reservation deleted successfully', 'Close', this.snackBarConfig);
      }),
      catchError((error) => {
        this.snackBar.open('Error deleting reservation', 'Close', this.snackBarConfig);
        return of(error);
      })
    );
  }

}
