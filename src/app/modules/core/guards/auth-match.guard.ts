import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[],
) => {
  const isAuthorized = inject(AuthService).isLoggedIn();
  return isAuthorized
    ? isAuthorized
    : inject(Router).createUrlTree(['logowanie']);
};
