import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoferComponent } from './chofer.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditChoferComponent } from './edit-chofer/edit-chofer.component';


@NgModule({
  declarations: [ChoferComponent, EditChoferComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TableModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [ChoferComponent, EditChoferComponent]
})
export class ChoferModule { }
