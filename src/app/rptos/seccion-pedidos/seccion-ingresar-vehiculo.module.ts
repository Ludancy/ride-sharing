import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionPedidosRoutingModule } from './seccion-ingresar-vehiculo-routing.module';
import { SeccionIngresarVehiculoComponent } from './seccion-ingresar-vehiculo.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    SeccionIngresarVehiculoComponent,
  ],
  imports: [
    CommonModule,
    SeccionPedidosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class SeccionPedidosModule { }
