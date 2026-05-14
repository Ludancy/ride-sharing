import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionProductosRoutingModule } from './seccion-sistema-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SeccionSistemaComponent } from './seccion-sistema.component';


@NgModule({
  declarations: [
    SeccionSistemaComponent,
    SidenavComponent,
    BodyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SeccionProductosRoutingModule
  ]
})
export class SeccionProductosModule { }
