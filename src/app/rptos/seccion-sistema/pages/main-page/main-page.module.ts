import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaProductoRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DialogoEvaluacionChoferComponent } from './components/dialogo-evaluacion-chofer/dialogo-evaluacion-chofer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogoVehiculoChoferComponent } from './components/dialogo-vehiculo-chofer/dialogo-vehiculo-chofer.component';
import { DialogoVerBancoComponent } from './components/dialogo-ver-banco/dialogo-ver-banco.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogoVerTrasladoWebComponent } from './components/dialogo-ver-traslado-webs/dialogo-ver-traslado-web.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DialogoVerContactoEmergenciaComponent } from './components/dialogo-ver-contacto-emergencia/dialogo-ver-contacto-emergencia.component';


@NgModule({
  declarations: [
    MainPageComponent,
    DialogoVerTrasladoWebComponent,
    DialogoEvaluacionChoferComponent,
    DialogoVehiculoChoferComponent,
    DialogoVerBancoComponent,
    DialogoVerContactoEmergenciaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ListaProductoRoutingModule,
    SharedModule,
    MatProgressBarModule
  ],
  exports: [
    DialogoEvaluacionChoferComponent,
  ]
})
export class ListaProductoModule { }
