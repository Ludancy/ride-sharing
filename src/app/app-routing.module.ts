import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404pageComponent } from './shared/pages/error404page/error404page.component';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';


const routes: Routes = [
  {
    path:'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'rptos',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./rptos/rptos.module').then(m=>m.RptosModule)
  },
  {
    path:'404',
    component: Error404pageComponent
  },
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
