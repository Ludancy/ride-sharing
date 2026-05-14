import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RecargarSaldoComponent } from './recargar-saldo/recargar-saldo.component';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  user:any;

  keys: Array<string> = ['nombre_chofer', 'nombre_origen', 'nombre_destino', 'estado', 'costo', 'id'];
  displayedColumns: Array<string> = ['Chofer', 'Origen','Destino', 'Estado', 'Costo'];
  data: Array<any> = [];
  configActions: any = {
    edit: true,
    delete: true
  };

  constructor(
    private _authService:AuthService,
    private dialog: MatDialog,
    private clienteServices: ClientService,
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
      this.user = this._authService.usuarioActual() as Usuario;
      this.clienteServices.getCliente(this.user.idUsuario).subscribe((res): any => {
        Object.assign(this.user, { saldo: res['saldo'], fechaNacimiento: res['fechaNacimiento'] });
        this.getClientes(this.user.idUsuario);
      });
    }

  getClientes(id:number):void {
    this.clienteServices.getTranslados(id).subscribe((res): any => {
      try{
        console.log(res)
        this.data = [...res.traslados]; // update array
      }catch(error){
        console.log('error ',error)
      }
    })
  }

  openModalAgregarSaldo():void {
    const data = {
      clienteId: this.user.idUsuario,
    }
    let dialogRef = this.dialog.open(RecargarSaldoComponent, {
      height: '470px',
      width: '600px',
      data: {id: this.user.idUsuario, monto: this.user.monto}
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.getUsuario();
    });
  }


}
