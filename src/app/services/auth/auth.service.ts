import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8085/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  /* register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }*/
}





























/*import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth:boolean=false;
  authSubject=new Subject<boolean>();
  constructor() { }
  emitAuthSubject(){
    this.authSubject.next(this.isAuth);
  }
  signIn():boolean{
    this.isAuth=true;
    console.log("Auth:"+this.isAuth)
    this.emitAuthSubject();
    return this.isAuth;
  }

  signOut():boolean{
    this.isAuth=false;
    console.log("Auth:"+this.isAuth)
    this.emitAuthSubject();
    return this.isAuth;
  }
}


*/