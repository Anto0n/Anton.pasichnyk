import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(!this.authService.isAuthenticated()){                                    //not Authenticated
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }

            // logged in so return true
            return this.authService.isAuthenticated();


        // not logged in so redirect to login page with the return url
       /* this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;*/
    }
}

/*
The auth guard is used to prevent unauthenticated users from accessing restricted routes, in this example it's used in app.routing.ts ' +
'to protect the home page route. For more information about angular 2 guards you can check out this post on the thoughtram blog.*/
