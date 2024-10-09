import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const router: Router = inject(Router);
  const token = localStorage.getItem('token');
  if (state.url === '/auth' && token) {
    await router.navigateByUrl('/projects');
    return false;
  }
  else if (state.url !== '/auth' && !token) {
    await router.navigateByUrl('/auth');
    return false;
  }
  return true;
};
