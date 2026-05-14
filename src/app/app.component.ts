import { Component, computed, effect, inject } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AuthService } from './auth/services/auth.service';
import { EstadoUsuario } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){
    registerLocaleData(localeEs);
  }
  
  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.estadoDelUsuario() === EstadoUsuario.checking) {
      return false;
    }
    return true;
  })

  public authStatusChangedEddect = effect(() => {
    switch (this.authService.estadoDelUsuario()) {
      case EstadoUsuario.checking:
        return;
      case EstadoUsuario.authenticated:
        this.router.navigateByUrl('/rptos/productos');
        return;
      case EstadoUsuario.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
      default:
        break;
    }
  })
}
