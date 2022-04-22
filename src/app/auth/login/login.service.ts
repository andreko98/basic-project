import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'src/environments/constants';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  path: import('@angular/router').ActivatedRouteSnapshot[];
  route: import('@angular/router').ActivatedRouteSnapshot;

  constructor(private router: Router) { }

}