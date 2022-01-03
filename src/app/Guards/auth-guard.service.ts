import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.tokenStorageService.isSignIn()) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
  }
  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  
}