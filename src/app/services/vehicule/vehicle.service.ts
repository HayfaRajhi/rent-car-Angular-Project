import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Vehicle} from '../../shared/models/vehicle';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import CONST from "../../../helpers/CONST";
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  snackBarConfig: MatSnackBarConfig = {duration: 3000, verticalPosition: 'top', horizontalPosition: 'right'};

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
  ) {
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(CONST.API_URL + "/vehicles/all", this.httpOptions);
  }

  getVehicleById(id: string | number): Observable<Vehicle> {
    return this.httpClient.get<Vehicle>(CONST.API_URL + "/vehicles/" + id, this.httpOptions);
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient.post<Vehicle>(CONST.API_URL + "/vehicles/add", vehicle, this.httpOptions).pipe(
      tap((createdVehicle: Vehicle) => {
        this.snackBar.open('Vehicle created successfully', 'Close', this.snackBarConfig);
      }),
      catchError((error) => {
        this.snackBar.open('Error creating vehicle', 'Close', this.snackBarConfig);
        return of(error);
      })
    );
  }

  updateVehicle(id: number, vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient.put<Vehicle>(CONST.API_URL + "/vehicles/edit/" + id, vehicle, this.httpOptions).pipe(
      tap((updatedVehicle: Vehicle) => {
        this.snackBar.open('Vehicle updated successfully', 'Close', this.snackBarConfig);
      }),
      catchError((error) => {
        this.snackBar.open('Error updating vehicle', 'Close', this.snackBarConfig);
        return of(error);
      })
    );
  }

  deleteVehicle(id: number): Observable<any> {
    return this.httpClient.delete<any>(CONST.API_URL + "/vehicles/" + id, this.httpOptions).pipe(
      tap(() => {
        this.snackBar.open('Vehicle deleted successfully', 'Close', this.snackBarConfig);
      }),
      catchError((error) => {
        this.snackBar.open('Error deleting vehicle', 'Close', this.snackBarConfig);
        return of(error);
      })
    );
  }
}
