import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthFacade } from '../../auth/store/auth.facade';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthFacade).isAuthenticated$.pipe(
    map((isAuthenticated) => (isAuthenticated ? true : router.createUrlTree(['/auth'])))
  );
};
