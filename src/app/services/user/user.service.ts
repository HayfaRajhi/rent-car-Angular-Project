import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import CONST from "../../../helpers/CONST";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getPublicContent(): Observable<any> {
    return this.http.get(CONST.API_URL + '/all', {responseType: 'text'});
  }

  getUserBoard(): Observable<any> {
    return this.http.get(CONST.API_URL + '/user', {responseType: 'text'});
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(CONST.API_URL + '/mod', {responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(CONST.API_URL + '/admin', {responseType: 'text'});
  }
}
