
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // Deactivate the guard by returning true, always allowing access to the route.
  return true;
};

/*import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor(private authService: AuthService , private router: Router) { }
  canActivate(): boolean {
    if (this.authService.isAuth) return true;
    this.router.navigate(['/signin'])
    return false;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
 return inject(GuardService).canActivate();
// return true;
};

*/
