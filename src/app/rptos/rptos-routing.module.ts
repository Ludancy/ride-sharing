import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RptosComponent } from './rptos.component';

const routes: Routes = [
  {
    path:'',
    component: RptosComponent,
    children: [
      {
        path:'inicio',
        loadChildren: () => import('./seccion-inicio/seccion-inicio.module').then(m=>m.SeccionInicioModule)
      },
      {
        path:'productos',
        loadChildren: () => import('./seccion-sistema/seccion-sistema.module').then(m=>m.SeccionProductosModule)
      },
      {
        path:'pedidos',
        loadChildren: () => import('./seccion-pedidos/seccion-ingresar-vehiculo.module').then(m=>m.SeccionPedidosModule)
      },
      {
        path:'**', redirectTo: 'productos',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RptosRoutingModule { }
