import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authActivateFunctionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const isAuthorized = inject(AuthService).isLoggedIn();
  return isAuthorized
    ? isAuthorized
    : inject(Router).createUrlTree(['logowanie']);
};
