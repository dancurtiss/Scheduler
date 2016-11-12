import { Injectable }       from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    NavigationExtras
}                           from '@angular/router';
import { AuthorizationService }      from './authorization.service';
import { AuthorizationDetails } from '../models/authorization';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthorizationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.checkLogin(route);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivate(route, state);
    }

    checkLogin(route: ActivatedRouteSnapshot): Promise<boolean> {
        return this.authService.getAuthorization().then((authDetails) => {
            if (!authDetails.username || !authDetails.permissions.length) {
                return false;
            }

            var permissionRequired = route.data['permission'];

            if (!permissionRequired) {
                return true;
            }

            return authDetails.permissions.indexOf(permissionRequired) > -1;
        });
    }
}
