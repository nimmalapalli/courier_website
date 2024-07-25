import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../serices/auth.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn:'root'
})
export class authGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.IsLoggedin()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
};
