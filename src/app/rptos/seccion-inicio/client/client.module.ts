import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RecargarSaldoComponent } from './recargar-saldo/recargar-saldo.component';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    ClientComponent,
    RecargarSaldoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TableModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    ClientComponent,
    RecargarSaldoComponent
  ]
})
export class ClientModule { }
