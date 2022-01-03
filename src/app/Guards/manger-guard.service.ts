import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';


@Injectable()
export class ManagerGuard implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.tokenStorageService.getUser();
        console.log(user);
        const roles = user.roles;
        const showAdminBoard = roles.includes('ROLE_ADMIN');
        const showManagerBoard = roles.includes('ROLE_MANAGER');
        if (user) {
            if (showManagerBoard || showAdminBoard) {
                return true;
            }
        }
        this.router.navigate(['/meals']);
        return false;

    }
    constructor(private tokenStorageService: TokenStorageService, private router: Router) { }


}