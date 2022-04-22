import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'src/environments/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  path: import('@angular/router').ActivatedRouteSnapshot[];
  route: import('@angular/router').ActivatedRouteSnapshot;

  constructor(private router: Router) {
  }

  canActivate() {
    if (localStorage.getItem(constants.user))
    {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

  isAuthenticated() {
    if (localStorage.getItem(constants.user))
    {
      return true;
    }
  
    return false;
  }
}
