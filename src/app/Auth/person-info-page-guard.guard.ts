import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonInfoPageGuardGuard implements CanActivate {
  constructor ( private auth: AuthService, private route: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isCompnayNameavailable) {
        return true;
      }  else {
        this.route.navigateByUrl('/refcode');
        return false;
      }
  }
}
