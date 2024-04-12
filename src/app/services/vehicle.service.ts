import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../shared/models/vehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {


  httpOptions ={
    headers :new HttpHeaders({
      'content-Type' :'application/json'
    })
  }

  constructor(private http: HttpClient,@Inject('BaseURL') private baseUrl) { }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl+"vehicles");
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.baseUrl+"vehicles/"+id);
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.baseUrl+"vehicles/edit/"+vehicle.id, vehicle,this.httpOptions);
  }

  updateVehicle(id:number,vehicle: Vehicle): Observable<Vehicle> {
    //return this.http.put<Vehicle>(`${this.baseUrl}/${vehicle.id}`, vehicle);
    return this.http.put<Vehicle>(this.baseUrl+"vehicles/edit/"+id,vehicle,this.httpOptions);

  }

  deleteVehicle(id: number): Observable<any> {
    //return this.http.delete(`${this.baseUrl}/${id}`);
    return this.http.delete<any>(this.baseUrl+"vehicles/"+id);

  }}
