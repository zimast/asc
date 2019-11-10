import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, first, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(
        private allowedRoles: string[],
        private authService: AuthService,
        private router: Router
    ) {

    }
    // tslint:disable-next-line: max-line-length
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.authService.user$.pipe(
            map(user => _.intersection(this.allowedRoles, user.roles).length > 0), 
            first(),
            tap(allowed => {

                if (!allowed) {
                    this.router.navigateByUrl('/');
                }

            })
        );
    }

}
