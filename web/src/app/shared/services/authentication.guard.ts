import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../login/domain/login.service';


@Injectable()
export class CanActivateAuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isLoggedIn()) {
      return true;
    }

    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['/layout/login']);
    return false;
  }
}