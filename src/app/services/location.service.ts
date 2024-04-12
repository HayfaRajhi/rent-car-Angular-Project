import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalLocation } from '../shared/models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  httpOptions ={
    headers :new HttpHeaders({
      'content-Type' :'application/json'
    })
  }

  constructor(private httpClient:HttpClient,
    @Inject('BaseURL')private baseUrl) { }

  getAllLocations():Observable<RentalLocation[]>{
    return this.httpClient.get<RentalLocation[]>(this.baseUrl+'locations/');
  }

  getLocationById(id:number):Observable<RentalLocation>{
    return this.httpClient.get<RentalLocation>(this.baseUrl+'locations/'+id);
  }

  createLocation(location:RentalLocation):Observable<RentalLocation>{
    return this.httpClient.post<RentalLocation>(this.baseUrl+"locations/",location);
  }

  updateLocation(id:number,location:RentalLocation): Observable<RentalLocation>{
    return this.httpClient.put<RentalLocation>(this.baseUrl+"/locations/"+id,location,this.httpOptions);
  }

  deleteLocation(id:number):Observable<RentalLocation>{
    return this.httpClient.delete<RentalLocation>(this.baseUrl+'/locations/'+id);
  }

}
