import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionInicioRoutingModule } from './seccion-inicio-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SeccionInicioComponent } from './seccion-inicio.component';
import { TableModule } from 'src/app/shared/components/table/table.module';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { ChoferModule } from './chofer/chofer.module';

@NgModule({
  declarations: [
    SeccionInicioComponent,
  ],
  imports: [
    CommonModule,
    SeccionInicioRoutingModule,
    MaterialModule,
    TableModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ChoferModule,
    AdminModule,
    ClientModule
  ],
  exports: []
})
export class SeccionInicioModule { }
