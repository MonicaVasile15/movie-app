import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    private localStorage: Storage;

    constructor(private router: Router) {
        this.localStorage = window.localStorage;
    }

    canActivate() {
        if ( this.localStorage.getItem('token') ) {
            return true;
        } else {
            this.router.navigateByUrl('login');
            return false;
        }
    }
}
