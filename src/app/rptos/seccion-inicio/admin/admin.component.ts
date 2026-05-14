import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AdminService } from './admin.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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

  keys: Array<string> = ['nombre_chofer', 'nombre_cliente', 'nombre_origen', 'nombre_destino', 'estado', 'costo', 'id'];
  displayedColumns: Array<string> = ['Chofer', 'Cliente', 'Origen','Destino', 'Estado', 'Costo'];
  data: Array<any> = [];
  configActions: any = {
    edit: true,
    delete: true
  };

  fechaInicial: Date | null = null;
  fechaFinal: Date | null = null;
  ganancias: number | null = null;

  constructor (
    private _authService: AuthService,
    private adminService: AdminService
    ){
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
    this.fechaInicial = new Date(''); // Puedes ajustar esto según tus necesidades
    this.fechaFinal = new Date(''); // Puedes ajustar esto según tus necesidades
    this.user = this._authService.usuarioActual() as Usuario;
  }

  calcularGanacias(): void {
    if (
      this.fechaInicial instanceof Date &&
      !isNaN(this.fechaInicial.getTime()) &&
      this.fechaFinal instanceof Date &&
      !isNaN(this.fechaFinal.getTime())
    ) {
      const fechaInicial = formatDate(this.fechaInicial, 'yyyy-MM-dd', 'es');
      const fechaFinal = formatDate(this.fechaFinal,'yyyy-MM-dd', 'es');

      this.adminService.getAllTranslados(fechaInicial, fechaFinal).subscribe((res): any => {
        try{
          this.ganancias = res.ganancias;
          this.data = [...res.traslados_realizados]; // update array
        }catch(error){
          console.log('error ',error)
        }
      })

    } else {
      console.error('Fechas no válidas');
    }
  }
}
