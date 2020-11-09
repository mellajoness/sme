import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../Services/auth.service';
import { SharedData } from 'src/Business/Shared/sharedservices/shared.components';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor ( private auth: AuthService, private route: Router, public sharedData: SharedData) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isRefCodeValid) {
        this.sharedData.productCode = null;
        return true;
      }  else {
        this.route.navigateByUrl('/refcode');
        this.sharedData.productCode = null;
        return false;
      }
  }
}

