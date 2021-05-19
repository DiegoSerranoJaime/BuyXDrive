import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
    private _router: Router) {}

  canActivate(): boolean {
    if (!this._authService.isAuthenticated()) {
      this._router.navigateByUrl('/home');
      return false;
    } else {
      return true;
    }
  }

}
