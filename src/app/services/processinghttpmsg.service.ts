import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesshttpmsgService {
  constructor() { }
  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `Json Server Error : ${error.status} - ${error.statusText || ''}`;
   }
    return throwError(errMsg);
  }
}
