import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const token = localStorage.getItem('token');
  if (state.url === '/auth' && token) {
    router.createUrlTree(['/projects']);
    return false;
  }
  else if (state.url !== '/auth' && !token) {
    router.createUrlTree(['/auth']);
    return false;
  }
  return true;
};
