import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RptosRoutingModule } from './rptos-routing.module';
import { RptosComponent } from './rptos.component';
@NgModule({
  declarations: [
    RptosComponent,
  ],
  imports: [
    CommonModule,
    RptosRoutingModule,
    MaterialModule
  ]
})
export class RptosModule { }
