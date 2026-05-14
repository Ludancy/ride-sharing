import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../auth/interfaces';

@Component({
  selector: 'app-rptos',
  templateUrl: './rptos.component.html',
  styles: [
    `
    @media (min-width: 500px) {
        .hide-on-big-screen {
          display: none;
        }
      }

      @media (max-width: 750px) {
        .textName {
          font-size: 50%;
        }
      }

      @media (max-width: 500px) {
        .hide-on-small-screen {
          display: none;
        }
      }
    `
  ]
})
export class RptosComponent {

  private authService = inject(AuthService)
  // private _isLogout = false;

  // public sidebarItems = [
  //   { label: 'Productos', icon: 'receipt_long', url: '/rptos/productos' },
  // ]

  public user = computed(() => this.authService.usuarioActual());

  constructor() {
    this.user()?.rol
  }

  onLogout() {
      this.authService.logout();
  }
}
