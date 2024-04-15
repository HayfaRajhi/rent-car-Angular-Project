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

  isAuthenticated(): boolean {
    return !!this.storageService.getAuthToken();
  }

  getAuthToken(): string {
    return this.storageService.getAuthToken();
  }

  logout(): void {
    this.storageService.clear();
    this.router.navigate(['/signin']);
  }
}
