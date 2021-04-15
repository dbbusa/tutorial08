import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthService, private _router: Router) {
  }
  canActivate(): boolean{
    if (this._authService.isLoggedIn() !== true){
      window.alert('Access not allow without login');
      this._router.navigate(['/signin']);
    }
    return true;
  }

}
