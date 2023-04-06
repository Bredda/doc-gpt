import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuth().pipe(
    map((e) => (e ? true : router.parseUrl('/auth/signin'))),
    catchError((e) => of(router.parseUrl('/auth/signin')))
  );
};
