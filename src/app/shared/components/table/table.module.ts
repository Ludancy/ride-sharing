import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
// Mat Angular
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
// Module
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [TableComponent],
  imports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule
  ],
  exports: [TableComponent]
})
export class TableModule { }
