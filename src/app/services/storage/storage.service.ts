import {Injectable} from '@angular/core';
import CONST from "../../../helpers/CONST";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  authToken = '';
  authUser = {}

  constructor() {
    //initializes the authToken and authUser properties by retrieving their values from the local storage.
    this.authToken = window.localStorage.getItem(CONST.TOKEN) || '';
    this.authUser = JSON.parse(window.localStorage.getItem(CONST. AUTH_USER)) || {};
  }

  clear(): void {
    //clears  the authentication token and user data from the local storage and resets the authToken and authUser properties to empty values
    this.authToken = '';
    this.authUser = {};
    window.localStorage.clear();
  }

  public setAuthToken(token: string): void {
    //sets the authentication token in both the authToken property and the local storage under the key CONST.TOKEN
    this.authToken = token;
    window.localStorage.setItem(CONST.TOKEN, token);
  }

  public getAuthToken(): any {
    //returns the current authentication token stored in the authToken property.
    return this.authToken;
  }

  public setAuthUser(user: any): void {
    this.authUser = user;
    // converts the user object to a JSON string before storing it.
    window.localStorage.setItem(CONST. AUTH_USER, JSON.stringify(user));
  }

  public getAuthUser(): any {
    return this.authUser;
  }
}
