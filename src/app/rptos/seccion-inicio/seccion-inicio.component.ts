import { Component, computed, inject, OnInit} from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-seccion-inicio',
  templateUrl: './seccion-inicio.component.html',
  styleUrls: ['./seccion-inicio.component.css']
})

export class SeccionInicioComponent implements OnInit {

  public user: Usuario = {
    distid: '',
    apellido:'',
    role_nombre: '',
    cedula: '',
    email_user: '',
    idAuth: 0,
    idUsuario: 0,
    nombre: '',
    rol: 0,
    saldo: '',
    nroCuenta: '',
  }

  constructor (
    private _authService: AuthService){
  }
  

  ngOnInit(): void {
    this.getUsuario();
  }

  /* 
    ---------------------------
    Usuario
    ---------------------------
  */ 
  getUsuario():void {
    this.user = this._authService.usuarioActual() as Usuario;
  }
}
