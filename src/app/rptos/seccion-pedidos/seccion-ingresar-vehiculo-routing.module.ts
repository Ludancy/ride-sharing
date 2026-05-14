import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeccionIngresarVehiculoComponent } from './seccion-ingresar-vehiculo.component';

const routes: Routes = [
  {
    path: '',
    component: SeccionIngresarVehiculoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionPedidosRoutingModule { }
