import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {CanActivateFn, Router} from '@angular/router';

export const RoleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const role = auth.getRoleSnapshot();

  if (role !== 'admin') {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
