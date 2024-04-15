import {Injectable} from '@angular/core';
import CONST from "../../../helpers/CONST";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  authToken = '';
  authUser = {}

  constructor() {
    this.authToken = window.localStorage.getItem(CONST.TOKEN) || '';
    this.authUser = JSON.parse(window.localStorage.getItem(CONST. AUTH_USER)) || {};
  }

  clear(): void {
    this.authToken = '';
    this.authUser = {};
    window.localStorage.clear();
  }

  public setAuthToken(token: string): void {
    this.authToken = token;
    window.localStorage.setItem(CONST.TOKEN, token);
  }

  public getAuthToken(): any {
    return this.authToken;
  }

  public setAuthUser(user: any): void {
    this.authUser = user;
    window.localStorage.setItem(CONST. AUTH_USER, JSON.stringify(user));
  }

  public getAuthUser(): any {
    return this.authUser;
  }
}
