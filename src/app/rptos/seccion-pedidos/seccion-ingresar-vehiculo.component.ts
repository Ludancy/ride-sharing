import { Component, ViewChild, computed, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeccionIngresarVehiculoService } from './services/seccion-ingresar-vehiculo.service';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-seccion-pedidos',
  templateUrl: './seccion-ingresar-vehiculo.component.html',
  styleUrls: ['./seccion-ingresar-vehiculo.component.css']
})
export class SeccionIngresarVehiculoComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService)
  private seccionIngresarVehiculo = inject(SeccionIngresarVehiculoService)

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  selectedFiles: File[] = [];
  isLoading = false;

  vehiculoFormulario: FormGroup = this.fb.group({
    marca: ['', [Validators.maxLength(255)]],
    color: ['', [Validators.maxLength(255)]],
    placa: ['', [Validators.maxLength(255)]],
    fecha: ['', [Validators.maxLength(255)]],
  });
  items: any = [{ name: "Marca", dist: "marca" }, { name: "Color", dist: "color" }, { name: "Placa", dist: "placa" },
                { name: "Fecha", dist: "fecha" },
  ]

  public user = computed(() => this.authService.usuarioActual());


  constructor() {
  }

  guardarVehiculo(): void {
    const idChofer = this.user()!.idUsuario
    const {marca, color, placa, fecha} = this.vehiculoFormulario.value
    const anio_fabricacion = fecha
    const estado_vehiculo = "Aprobado"
    const body = {idChofer, marca, color, placa, anio_fabricacion, estado_vehiculo}
    this.seccionIngresarVehiculo.PostVehiculo(body)
      .subscribe(resp => {
        if (resp["message"] === "Vehículo registrado correctamente") {
          Swal.fire('Excelente', resp["message"], 'success')
        }
        else {
          Swal.fire('Error', `hablar con el administrador. Error: ${resp["msg"]}`, 'error')
          this.isLoading = false;
        }
      });
  }
}