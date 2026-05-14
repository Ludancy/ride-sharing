import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeccionInicioComponent } from './seccion-inicio.component';

const routes: Routes = [
  {
    path:'',
    component: SeccionInicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionInicioRoutingModule { }
