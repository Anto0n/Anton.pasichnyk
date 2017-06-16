import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "../../services/authentication.service";

@Injectable()
export class ModeratorGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!(this.authService.isModerator() || this.authService.isAdmin())){
      this.router.navigate(['/error'], { queryParams: { returnUrl: state.url }});
      return false;
    }

    // logged in so return true*/
    return this.authService.isAuthenticated();

  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    if(!(this.authService.isModerator() || this.authService.isAdmin())){
      this.router.navigate(['/error']);
      return false;
    }

    // logged in so return true*/
    return this.authService.isAuthenticated();
  }

}
