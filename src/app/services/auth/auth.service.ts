import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import CONST from "../../../helpers/CONST";
import {StorageService} from "../storage/storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {}


  /*a POST request to the authentication API endpoint ( with the provided username and password. 
  //It returns an Observable<any> that represents the HTTP response.*/
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      CONST.AUTH_API + '/signin',
      {
        username,
        password,
      },
      this.httpOptions
    )
  }
  /*checks if the user is authenticated by calling this.storageService.getAuthToken() and converting the result into a boolean using !!. If an authentication token exists, it returns true; otherwise, it returns false.
  getAuthToken(): string: This method retrieves the authentication token from the StorageService.*/
  isAuthenticated(): boolean {
    return !!this.storageService.getAuthToken();
  }

  //retrieves the authentication token from the StorageService.
  getAuthToken(): string {
    return this.storageService.getAuthToken();
  }
  // clears the authentication-related data stored in the StorageService and navigates the user to the /signin
  logout(): void {
    this.storageService.clear();
    this.router.navigate(['/signin']);
  }
}
