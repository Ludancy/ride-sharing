import { Component, Inject, computed, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TrasladoResponse } from 'src/app/rptos/seccion-sistema/interfaces/traslado-response';

interface ProductosEnVentasWeb {
  id_producto: number;
  precio1: string;
  precio2: string;
  id_usuario_ml: number;
}

@Component({
  selector: 'app-dialogo-ver-traslado-web',
  templateUrl: './dialogo-ver-traslado-web.component.html',
  styleUrls: ['./dialogo-ver-traslado-web.component.css'],
})
export class DialogoVerTrasladoWebComponent {
  private authService = inject(AuthService)
  // private dialofRef = inject(MatDialogRef<DialogoVerTrasladoWebComponent>)
  public user = computed(() => this.authService.usuarioActual());
  public nombreChofer: string = '';
  public placa: string = '';
  public color: string = '';
  public marca: string = '';
  public origen: string = '';
  public destino: string = '';

  productosAlaBBDD: ProductosEnVentasWeb[] = [];
  usuariosML: Usuario[] = []
  id_usuario_ml: number = 0;

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { origen: string; destino: string; traslado: TrasladoResponse }) {
    this.origen = data.origen;
    this.destino = data.destino;
    this.placa = data.traslado.placa
    this.nombreChofer = data.traslado.nombre;
    this.color = data.traslado.color;
    this.marca = data.traslado.marca
  }


}
