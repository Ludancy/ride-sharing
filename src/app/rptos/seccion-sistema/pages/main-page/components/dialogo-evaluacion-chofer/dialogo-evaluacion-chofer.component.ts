import { Component, ElementRef, Inject, ViewChild, computed, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MainPageService } from '../../services/main-page.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dialogo-nota-producto',
  templateUrl: './dialogo-evaluacion-chofer.component.html',
  styleUrls: ['./dialogo-evaluacion-chofer.component.css']
})
export class DialogoEvaluacionChoferComponent {
  private MainPageService = inject(MainPageService);
  private authService = inject(AuthService)
  
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  public calificacion: number = 0;
  public tipo:number;
  private idChofer: number = 0;
  private idVehiculo: number = 0;
  public user = computed(() => this.authService.usuarioActual());

  //tipo 1: chofer.
  //tipo 2:vehiculo
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number; tipo: number }) {
    
    this.tipo = data.tipo

    switch (data.tipo) {
      case 1:
        this.idChofer = data.id;
        this.MainPageService.getEvaluacionChofer(data.id)
        .subscribe( resp => {
          this.tagInput.nativeElement.value = resp.calificacion.toString();
        })   
      break;
      case 2:
        this.idVehiculo = data.id;
        this.MainPageService.getEvaluacionVehiculo(data.id)
        .subscribe( resp => {
          this.calificacion = resp.calificacion
          this.tagInput.nativeElement.value = resp.calificacion.toString();
        })
      break;
      default:
      break;
    }
  }


  EvaluarChofer(): void{
    const calificacion = this.tagInput.nativeElement.value
      this.MainPageService.postEvaluacion(this.idChofer, Number(calificacion))
      .subscribe( resp => {
        console.log(resp);
      })
        // console.log("No se hace nada");
    }

    EvaluarVehiculo():void{
      const calificacion = this.tagInput.nativeElement.value
      this.MainPageService.postEvaluacionVehiculo(this.idVehiculo, Number(calificacion))
      .subscribe( resp => {
        if (resp["message"] === 'Evaluación de vehículo registrada con éxito'){
          Swal.fire('Excelente', resp["message"], 'success')
        }
        else{
          Swal.fire('Error', "Error. hablar con el administrador", 'error')
        }
      })
    }
 }

