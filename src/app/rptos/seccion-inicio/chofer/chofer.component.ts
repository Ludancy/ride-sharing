import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/auth/interfaces';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { EditChoferComponent } from './edit-chofer/edit-chofer.component';
import { MainPageService } from '../../seccion-sistema/pages/main-page/services/main-page.service';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.component.html',
  styleUrls: ['./chofer.component.css']
})
export class ChoferComponent {
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

  // data de tabla de contactos de emergencia
  keys: Array<string> = ['nombre', 'telefono', 'id'];
  displayedColumns: Array<string> = ['Nombre', 'Telefono','Acciones'];
  data: Array<any> = [];
  configActions: any = {
    edit: true,
    delete: true
  };

  constructor (
    private _authService: AuthService,
    private choferServices: MainPageService,
    private dialog: MatDialog){
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
    this.choferServices.getChofer(this.user.idUsuario).subscribe((res): any => {
      Object.assign(this.user, { saldo: res['saldo'], nroCuenta: res['nroCuenta'] });
      this.getDataContactosdeEmergencia(this.user.idUsuario);
    });
  }

  /* 
    ---------------------------
    Table
    ---------------------------
  */ 

  getDataContactosdeEmergencia(id:number):void {
    this.choferServices.getClientedeEmergecia(id).subscribe((res): any => {
      try{
        this.data = [...res]; // update array
      }catch(error){
        console.log('error ',error)
      }
    })
  }

  // Table Actions
  eliminarContacto(index:number):void {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar este cliente?',
      text: "¡No se podra revertir este cambio!",
      icon: 'warning',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar este cliente'
    } as SweetAlertOptions).then((result) => {
      if (result['value']) {
        this.choferServices.deleteClientedeEmergecia(this.data[index]['id']).subscribe((res: any) => {
          Swal.fire({
            title: `${res.message}`,
            text: "",
            icon: "success"
          }).then((result) => {
            this.getDataContactosdeEmergencia(this.user.idUsuario);
          });
        })
      } else {
      }
    })
  }

  editContacto(index:number):void {
    let dialogRef = this.dialog.open(EditChoferComponent, {
      height: '303px',
      width: '600px',
      data: {editar: true, result: this.data[index]}
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.getDataContactosdeEmergencia(this.user.idUsuario);
    });
  }

  openModalAgregarContracto():void {
    const data = {
      choferId: this.user.idUsuario,
    }
    let dialogRef = this.dialog.open(EditChoferComponent, {
      height: '303px',
      width: '600px',
      data: {editar: false, result: data}
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.getDataContactosdeEmergencia(this.user.idUsuario);
    });
  }
}
