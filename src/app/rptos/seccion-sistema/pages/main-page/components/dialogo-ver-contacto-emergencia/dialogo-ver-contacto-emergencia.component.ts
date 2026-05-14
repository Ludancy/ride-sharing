import { Component, Inject, computed, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MainPageService } from '../../services/main-page.service';
import { ContactoEmergencia } from 'src/app/rptos/seccion-sistema/interfaces/models/contacto_emergencia';

@Component({
  selector: 'app-dialogo-ver-contacto-emergencia',
  templateUrl: './dialogo-ver-contacto-emergencia.component.html',
  styleUrls: ['./dialogo-ver-contacto-emergencia.component.css'],
})


export class DialogoVerContactoEmergenciaComponent {
  private authService = inject(AuthService)
  private MainPageService = inject(MainPageService);
  
  public user = computed(() => this.authService.usuarioActual());
  public contactoEmergencia: ContactoEmergencia[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
    this.MainPageService.getContactoDeEmergencia(data)
    .subscribe( resp => {
      this.contactoEmergencia = resp
    })
  }
}
