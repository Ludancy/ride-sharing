import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { EstadoUsuario } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router);
  
  if(authService.estadoDelUsuario() === EstadoUsuario.authenticated) {
    return true;
  }
  
  // const url =  state.url;
  // localStorage.setItem('url', url);

  router.navigateByUrl('/auth/login')
  return false;
};
